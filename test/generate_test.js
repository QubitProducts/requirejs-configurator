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
    'foo@1.0.0': {
      bar: 'bar@1.0.0'
    },
    '*': {
      '@qubit/moment@^2.8.3': '@qubit/moment@2.8.3',
      'when@^3.4.4': 'when@3.4.4',
      'underscore@>=1.5.0': 'underscore@1.7.0',
      'foo@^1.0.0': 'foo@1.0.0',
      'bar@^1.0.0': 'bar@1.0.0'
    }
  },
  packages: [{
    name: 'backbone@1.1.2',
    main: 'backbone.js',
    location: 'pkg/backbone@1.1.2'
  }, {
    name: 'when@3.4.4',
    main: 'when',
    location: 'pkg/when@3.4.4'
  }, {
    location: 'pkg/@qubit/moment@2.8.3',
    main: './moment.js',
    name: '@qubit/moment@2.8.3'
  }, {
    name: 'foo@1.0.0',
    main: 'index',
    location: 'pkg/foo@1.0.0'
  }, {
    name: 'underscore@1.7.0',
    main: 'underscore.js',
    location: 'pkg/underscore@1.7.0'
  }, {
    name: 'bar@1.0.0',
    main: 'index',
    location: 'pkg/bar@1.0.0'
  }]
};

var output_wo_peer_deps = {
  map: {
    'backbone@1.1.2': {
      underscore: 'underscore@1.7.0'
    },
    '*': {
      '@qubit/moment@^2.8.3': '@qubit/moment@2.8.3',
      'when@^3.4.4': 'when@3.4.4',
      'underscore@>=1.5.0': 'underscore@1.7.0',
      'foo@^1.0.0': 'foo@1.0.0'
    }
  },
  packages: [{
    name: 'backbone@1.1.2',
    main: 'backbone.js',
    location: 'pkg/backbone@1.1.2'
  }, {
    name: 'when@3.4.4',
    main: 'when',
    location: 'pkg/when@3.4.4'
  }, {
    location: 'pkg/@qubit/moment@2.8.3',
    main: './moment.js',
    name: '@qubit/moment@2.8.3'
  }, {
    name: 'foo@1.0.0',
    main: 'index',
    location: 'pkg/foo@1.0.0'
  }, {
    name: 'underscore@1.7.0',
    main: 'underscore.js',
    location: 'pkg/underscore@1.7.0'
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
 it("supports node style API (With excluding peerDependencies)", function (done) {
    var root = path.join(__dirname, "fixture");
    rc.generate({
      dependencies: readDependencies(root),
      resolve: makeResolveNodeStyle(root),
      excludePeerDeps: true
    }, function (err, config) {
      if (err) return done(err);
      config.packages = rewriteLocation(config.packages);
      expect(config).to.deep.equal(output_wo_peer_deps);
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