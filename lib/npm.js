var _ = require("lodash");
var when = require("when");
var path = require("path");
var resolveModule = require("resolve");
var generate = require("./generate");
var uid = require("./uid");

module.exports = function (root) {
  var dependencies = readDependencies(root);
  return generate({
    root: root,
    dependencies: flattenDependencies(dependencies),
    resolve: resolve,
    location: function (manifest, location) {
      return path.relative(root, location);
    }
  }).then(function (config) {
    _.each(dependencies, function (version, name) {
      config.map["*"][name] = uid.create(name, version);
    });
    return config;
  });
};

function flattenDependencies(dependencies) {
  return _.map(dependencies, function (version, dep) {
    return dep + "@" + version;
  });
}

function readDependencies(path) {
  return require(path + "/package.json").dependencies;
}

function resolve(name, version, basedir) {
  return when.promise(function (resolve, reject) {
    resolveModule(name + "/package.json", {basedir: basedir}, function (err, location) {
      if (err) return reject(err);
      resolve(path.dirname(location));
    });
  });
}