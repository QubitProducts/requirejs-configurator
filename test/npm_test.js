var rc = require("../");
var path = require("path");
var expect = require("chai").expect;

var output = {
  map: {
    'backbone@1.1.2': {
      'underscore': 'underscore@1.7.0'
    },
    '*': {
      '@qubit/moment': '@qubit/moment@2.8.3',
      '@qubit/moment@^2.8.3': '@qubit/moment@2.8.3',
      'backbone': 'backbone@1.1.2',
      "index": "../browser",
      "promise": "when@3.4.4",
      'when@^3.4.4': 'when@3.4.4',
      'when': 'when@3.4.4',
      'underscore@>=1.5.0': 'underscore@1.7.0'
    }
  },
  packages: [{
    name: 'backbone@1.1.2',
    main: 'backbone.js',
    location: 'node_modules/backbone'
  }, {
    name: 'when@3.4.4',
    main: 'when',
    location: 'node_modules/when'
  }, {
    location: 'node_modules/@qubit/moment',
    main: './moment.js',
    name: '@qubit/moment@2.8.3'
  }, {
    name: 'underscore@1.7.0',
    main: 'underscore.js',
    location: 'node_modules/backbone/node_modules/underscore'
  }]
},
output_dev_dependencies = {
  "map": {
    "*": {
      "when@^3.4.4": "when@3.4.4",
      "@qubit/moment@^2.8.3": "@qubit/moment@2.8.3",
      "chai@1.9.1": "chai@1.10.0",
      "mocha@1.21.4": "mocha@1.21.5",
      "underscore@>=1.5.0": "underscore@1.7.0",
      "minimatch@~0.2.11": "minimatch@0.2.14",
      "graceful-fs@~2.0.0": "graceful-fs@2.0.3",
      "inherits@2": "inherits@2.0.3",
      "lru-cache@2": "lru-cache@2.7.3",
      "sigmund@~1.0.0": "sigmund@1.0.1",
      "backbone": "backbone@1.1.2",
      "when": "when@3.4.4",
      "@qubit/moment": "@qubit/moment@2.8.3",
      "chai": "chai@1.10.0",
      "mocha": "mocha@1.21.5",
      "index": "../browser",
      "promise": "when@3.4.4"
    },
    "backbone@1.1.2": {
      "underscore": "underscore@1.7.0"
    },
    "chai@1.10.0": {
      "assertion-error": "assertion-error@1.0.0",
      "deep-eql": "deep-eql@0.1.3"
    },
    "mocha@1.21.5": {
      "commander": "commander@2.3.0",
      "debug": "debug@2.0.0",
      "diff": "diff@1.0.8",
      "escape-string-regexp": "escape-string-regexp@1.0.2",
      "glob": "glob@3.2.3",
      "growl": "growl@1.8.1",
      "jade": "jade@0.26.3",
      "mkdirp": "mkdirp@0.5.0"
    },
    "deep-eql@0.1.3": {
      "type-detect": "type-detect@0.1.1"
    },
    "debug@2.0.0": {
      "ms": "ms@0.6.2"
    },
    "glob@3.2.3": {
      "minimatch": "minimatch@0.2.14",
      "graceful-fs": "graceful-fs@2.0.3",
      "inherits": "inherits@2.0.3"
    },
    "jade@0.26.3": {
      "commander": "commander@0.6.1",
      "mkdirp": "mkdirp@0.3.0"
    },
    "mkdirp@0.5.0": {
      "minimist": "minimist@0.0.8"
    },
    "minimatch@0.2.14": {
      "lru-cache": "lru-cache@2.7.3",
      "sigmund": "sigmund@1.0.1"
    }
  },
  "packages": [
    {
      "name": "backbone@1.1.2",
      "main": "backbone.js",
      "location": "node_modules/backbone"
    },
    {
      "name": "when@3.4.4",
      "main": "when",
      "location": "node_modules/when"
    },
    {
      "name": "@qubit/moment@2.8.3",
      "main": "./moment.js",
      "location": "node_modules/@qubit/moment"
    },
    {
      "name": "chai@1.10.0",
      "main": "./index",
      "location": "node_modules/chai"
    },
    {
      "name": "mocha@1.21.5",
      "main": "./mocha.js",
      "location": "node_modules/mocha"
    },
    {
      "name": "underscore@1.7.0",
      "main": "underscore.js",
      "location": "node_modules/backbone/node_modules/underscore"
    },
    {
      "name": "assertion-error@1.0.0",
      "main": "./index",
      "location": "node_modules/chai/node_modules/assertion-error"
    },
    {
      "name": "deep-eql@0.1.3",
      "main": "./index",
      "location": "node_modules/chai/node_modules/deep-eql"
    },
    {
      "name": "commander@2.3.0",
      "main": "index",
      "location": "node_modules/mocha/node_modules/commander"
    },
    {
      "name": "debug@2.0.0",
      "main": "./browser.js",
      "location": "node_modules/mocha/node_modules/debug"
    },
    {
      "name": "diff@1.0.8",
      "main": "./diff",
      "location": "node_modules/mocha/node_modules/diff"
    },
    {
      "name": "escape-string-regexp@1.0.2",
      "main": "index",
      "location": "node_modules/mocha/node_modules/escape-string-regexp"
    },
    {
      "name": "glob@3.2.3",
      "main": "glob.js",
      "location": "node_modules/mocha/node_modules/glob"
    },
    {
      "name": "growl@1.8.1",
      "main": "./lib/growl.js",
      "location": "node_modules/mocha/node_modules/growl"
    },
    {
      "name": "jade@0.26.3",
      "main": "./index.js",
      "location": "node_modules/mocha/node_modules/jade"
    },
    {
      "name": "mkdirp@0.5.0",
      "main": "./index",
      "location": "node_modules/mocha/node_modules/mkdirp"
    },
    {
      "name": "type-detect@0.1.1",
      "main": "./index",
      "location": "node_modules/chai/node_modules/deep-eql/node_modules/type-detect"
    },
    {
      "name": "ms@0.6.2",
      "main": "./index",
      "location": "node_modules/mocha/node_modules/debug/node_modules/ms"
    },
    {
      "name": "minimatch@0.2.14",
      "main": "minimatch.js",
      "location": "node_modules/mocha/node_modules/glob/node_modules/minimatch"
    },
    {
      "name": "graceful-fs@2.0.3",
      "main": "graceful-fs.js",
      "location": "node_modules/mocha/node_modules/glob/node_modules/graceful-fs"
    },
    {
      "name": "inherits@2.0.3",
      "main": "./inherits_browser.js",
      "location": "node_modules/mocha/node_modules/glob/node_modules/inherits"
    },
    {
      "name": "commander@0.6.1",
      "main": "index",
      "location": "node_modules/mocha/node_modules/jade/node_modules/commander"
    },
    {
      "name": "mkdirp@0.3.0",
      "main": "./index",
      "location": "node_modules/mocha/node_modules/jade/node_modules/mkdirp"
    },
    {
      "name": "minimist@0.0.8",
      "main": "index.js",
      "location": "node_modules/mocha/node_modules/mkdirp/node_modules/minimist"
    },
    {
      "name": "lru-cache@2.7.3",
      "main": "lib/lru-cache.js",
      "location": "node_modules/mocha/node_modules/glob/node_modules/minimatch/node_modules/lru-cache"
    },
    {
      "name": "sigmund@1.0.1",
      "main": "sigmund.js",
      "location": "node_modules/mocha/node_modules/glob/node_modules/minimatch/node_modules/sigmund"
    }
  ]
};

describe("rc.npm", function () {
  it("generates configuration for an npm based project", function () {
    return rc.npm(path.join(__dirname, "fixture")).then(function (config) {
      expect(config).to.deep.equal(output);
    });
  });
  it("generates configuration that includes devDependencies", function() {
    return rc.npm(path.join(__dirname, "fixture"), undefined, 1).then(function (config) {
      expect(config).to.deep.equal(output_dev_dependencies);
    });
  });
  it("supports node style API", function (done) {
    rc.npm(path.join(__dirname, "fixture"), function (err, config) {
      expect(config).to.deep.equal(output);
      done();
    });
  });
});