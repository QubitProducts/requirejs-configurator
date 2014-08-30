var rc = require("../");
var path = require("path");
var expect = require("chai").expect;

var _ = require("lodash");
var when = require("when");
var path = require("path");
var resolveModule = require("resolve");
var uid = require("../lib/uid");

var output = {
  map: {
    'backbone@1.1.2': {
      underscore: 'underscore@1.7.0'
    },
    '*': {
      'underscore@>=1.5.0': 'underscore@1.7.0'
    }
  },
  packages: [{
    name: 'backbone@1.1.2',
    main: 'backbone.js',
    location: 'pkg/backbone@1.1.2'
  }, {
    name: 'underscore@1.7.0',
    main: 'underscore.js',
    location: 'pkg/underscore@1.7.0'
  }]
};

describe("rc.npm", function () {
  it("generates configuration for an npm based project", function () {
    var root = path.join(__dirname, "..");
    return rc.generate({
      dependencies: readDependencies(root),
      resolve: resolve,
      location: createLocation
    }).then(function (config) {
      expect(config).to.deep.equal(output);
    });
  });
  it("supports node style API", function (done) {
    var root = path.join(__dirname, "..");
    rc.generate({
      dependencies: readDependencies(root),
      resolve: resolveNodeStyle,
      location: createLocation
    }, function (err, config) {
      expect(config).to.deep.equal(output);
      done();
    });
  });
});

function readDependencies(path) {
  return _.reduce(require(path + "/package.json").dependencies, function (memo, version, dep) {
    if (dep === "backbone") {
      memo.push(dep + "@" + version);
    }
    return memo;
  }, []);
}

function resolve(name, version, basedir) {
  return when.promise(function (resolve, reject) {
    resolveModule(name + "/package.json", {basedir: basedir}, function (err, location) {
      if (err) return reject(err);
      resolve(path.dirname(location));
    });
  });
}

function resolveNodeStyle(name, version, basedir, cb) {
  resolveModule(name + "/package.json", {basedir: basedir}, function (err, location) {
    if (err) return cb(err);
    cb(null, path.dirname(location));
  });
}

function createLocation(manifest) {
  return "pkg/" + uid.create(manifest.name, manifest.version);
}