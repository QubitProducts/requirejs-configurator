var _ = require("lodash");
var R = require("ramda");
var path = require("path");
var expect = require("chai").expect;
var when = require("when");
var path = require("path");
var resolveModule = require("resolve");

var rc = require("../");

var output = {
  map: {
    'backbone@1.1.2': {
      underscore: 'underscore@1.7.0'
    },
    '*': {
      '@qubit/moment@^2.8.3': '@qubit/moment@2.8.3',
      'when@^3.4.4': 'when@3.4.4',
      'underscore@>=1.5.0': 'underscore@1.7.0'
    }
  },
  packages: [{
    location: 'pkg/@qubit/moment@2.8.3',
    main: './moment.js',
    name: '@qubit/moment@2.8.3'
  }, {
    name: 'backbone@1.1.2',
    main: 'backbone.js',
    location: 'pkg/backbone@1.1.2'
  }, {
    name: 'underscore@1.7.0',
    main: 'underscore.js',
    location: 'pkg/underscore@1.7.0'
  }, {
    name: 'when@3.4.4',
    main: 'when',
    location: 'pkg/when@3.4.4'
  }]
};

describe("rc.generate", function () {
  it("generates configuration for an npm based project", function () {
    var root = path.join(__dirname, "fixture");
    return rc.generate({
      dependencies: readDependencies(root),
      resolve: makeResolve(root)
    }).then(function (config) {
      config.packages = rewriteLocation(config.packages);
      expect(config).to.deep.equal(output);
    });
  });
  it("supports node style API", function (done) {
    var root = path.join(__dirname, "fixture");
    rc.generate({
      dependencies: readDependencies(root),
      resolve: makeResolveNodeStyle(root)
    }, function (err, config) {
      if (err) return done(err);
      config.packages = rewriteLocation(config.packages);
      expect(config).to.deep.equal(output);
      done();
    });
  });
});

function readDependencies(path) {
  return _.reduce(require(path + "/package.json").dependencies, function (memo, version, dep) {
    memo.push(dep + "@" + version);
    return memo;
  }, []);
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

function makeResolveNodeStyle(root) {
  return function resolveNodeStyle(name, version, basedir, cb) {
    resolveModule(name + "/package.json", {basedir: basedir || root}, function (err, location) {
      if (err) return cb(err);
      cb(null, path.dirname(location));
    });
  };
}

function createLocation(pkgUid) {
  return "pkg/" + pkgUid;
}

function rewriteLocation(pkgs) {
  return R.map(function (pkg) {
    pkg.location = createLocation(pkg.name);
    return pkg;
  }, pkgs);
}