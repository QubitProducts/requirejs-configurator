var R = require("ramda");
var when = require("when");
var path = require("path");
var resolveModule = require("resolve");
var generate = require("./generate");
var uid = require("./uid");

module.exports = function (root, options) {
  var dependencies = readDependencies(root);
  options = options || {};
  return generate(R.mixin({
    dependencies: flattenDependencies(dependencies),
    resolve: makeResolve(root),
    location: function (manifest, location) {
      return path.relative(root, location);
    }
  }, options)).then(function (config) {
    mapObj(function (version, name) {
      config.map["*"][name] = uid.create(name, version);
    }, dependencies);
    return config;
  });
};

function flattenDependencies(dependencies) {
  return mapObj(function (version, dep) {
    return dep + "@" + version;
  }, dependencies);
}

function readDependencies(path) {
  return require(path + "/package.json").dependencies;
}

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

function mapObj(fn, obj) {
  return R.values(R.mapObj.idx(fn, obj));
}