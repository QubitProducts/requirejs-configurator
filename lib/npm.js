var R = require("ramda");
var when = require("when");
var path = require("path");
var resolveModule = require("resolve");
var nodefn = require("when/node/function");
var generate = require("./generate");
var mapObj = require("./map_obj");
var uid = require("./uid");
var pipeline = require('when/pipeline');

module.exports = function (root, cb) {
  var config = generateNpmConfig(root);
  // support node style API
  if (cb) nodefn.bindCallback(config, cb);
  // support promise API
  return config;
};

function generateNpmConfig(root) {
  var dependencies = readDependencies(root);
  var options = {
    dependencies: flattenDependencies(dependencies),
    resolve: makeResolve(root)
  };

  return pipeline([
    generate,
    rewriteLocations.bind(null, root),
    addTopLevelMap.bind(null, dependencies)
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
function addTopLevelMap(dependencies, config) {
  mapObj(function (version, name) {
    var pkgUid = uid.create(name, version);
    var specificName = config.map["*"][pkgUid] || pkgUid;
    config.map["*"][name] = specificName;
  }, dependencies);
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
function readDependencies(path) {
  return require(path + "/package.json").dependencies;
}

/**
 * create a resolver for generator
 * it uses the root as basedir for top level packages
 */
function makeResolve(root) {
  return function resolve(name, version, basedir) {
    return when.promise(function (resolve, reject) {
      resolveModule(name + "/package.json", {basedir: basedir || root}, function (err, location) {
        if (err) return reject(err);
        resolve(path.dirname(location));
      });
    });
  };
}