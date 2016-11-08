var R = require("ramda");
var when = require("when");
var path = require("path");
var resolveModule = require("resolve");
var nodefn = require("when/node/function");
var uid = require("pkguid");
var pipeline = require("when/pipeline");
var generate = require("./generate");
var aliasBrowser = require("./alias_browser");
var mapObj = require("./map_obj");

module.exports = function (root, opts, cb) {
  if (R.is(Function, opts)) {
    cb = opts;
    opts = undefined;
  }

  opts = opts || {
    includeDevDeps: false
  };

  var config = generateNpmConfig(root, {
    includeDevDeps: opts.includeDevDeps
  });
  // support node style API
  if (cb) nodefn.bindCallback(config, cb);
  // support promise API
  return config;
};

function generateNpmConfig(root, opts) {
  var dependencies = readDependencies(root, opts.includeDevDeps);
  var options = {
    dependencies: flattenDependencies(dependencies),
    resolve: makeResolve(root)
  };

  return pipeline([
    generate,
    rewriteLocations.bind(null, root),
    addTopLevelMap.bind(null, dependencies, meta(root).browser)
  ], options);
}

/**
 * rewrite package locations relative to the root
 */
function rewriteLocations(root, config) {
  config.packages = R.map(function (pkg) {
    pkg.location = path.relative(root, pkg.location);
    return pkg;
  }, config.packages);
  return config;
}

/**
 * generate an additional top level map so that unversioned requires work
 * e.g. require("foo")
 */
function addTopLevelMap(dependencies, browser, config) {
  mapObj(function (version, name) {
    var pkgUid = uid.create(name, version);
    var specificName = config.map["*"][pkgUid] || pkgUid;
    config.map["*"][name] = specificName;
  }, dependencies);

  config.map["*"] = aliasBrowser(config.map["*"], browser);

  return config;
}

/**
 * generate function takes in a flat array of dependencies, so convert the dependency map
 * into an array of pkgUids
 */
function flattenDependencies(dependencies) {
  return mapObj(function (version, dep) {
    return dep + "@" + version;
  }, dependencies);
}

/**
 * given a root path, read the dependencies from package.json
 */
function readDependencies(path, includeDevDeps) {
    return !includeDevDeps
      ? meta(path).dependencies
      : R.mixin(meta(path).dependencies, meta(path).devDependencies);
}

function meta(dir) {
  return require(path.join(dir, "package.json"));
}

/**
 * create a resolver for generator
 * it uses the root as basedir for top level packages
 */
function makeResolve(root) {
  return function resolve(name, version, basedir) {
    return when.promise(function (resolve, reject) {
      resolveModule(name + "/package.json", {basedir: basedir || root}, function (err, location) {

        var pkg;

        if (err) {

          pkg = meta(typeof basedir === 'string' ? basedir : root);

          // Resolve with undefined because optional dependency is missing
          if (err.message.search(/^Cannot find module/) >= 0 && pkg.hasOwnProperty('optionalDependencies') && pkg.optionalDependencies[name] === version) {
            resolve();
          } else {
            return reject(err);
          }

        }

        resolve(location ? path.dirname(location) : undefined);

      });
    });
  };
}