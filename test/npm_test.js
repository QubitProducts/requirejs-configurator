var rc = require("../");
var path = require("path");
var expect = require("chai").expect;

var output = {
  "map": {
    "*": {
      "when@^3.4.4": "when@3.4.4",
      "@qubit/moment@^2.8.3": "@qubit/moment@2.8.3",
      "underscore@>=1.5.0": "underscore@1.7.0",
      "backbone": "backbone@1.1.2",
      "when": "when@3.4.4",
      "@qubit/moment": "@qubit/moment@2.8.3",
      "index": "../browser",
      "promise": "when@3.4.4"
    },
    "backbone@1.1.2": {
      "underscore": "underscore@1.7.0"
    }
  },
  "packages": [
    {
      "name": "@qubit/moment@2.8.3",
      "main": "./moment.js",
      "location": "node_modules/@qubit/moment"
    },
    {
      "name": "backbone@1.1.2",
      "main": "backbone.js",
      "location": "node_modules/backbone"
    },
    {
      "name": "underscore@1.7.0",
      "main": "underscore.js",
      "location": "node_modules/backbone/node_modules/underscore"
    },
    {
      "name": "when@3.4.4",
      "main": "when",
      "location": "node_modules/when"
    }
  ]
};

var outputWithDevDependencies = {
  "map": {
    "*": {
      "when@^3.4.4": "when@3.4.4",
      "@qubit/moment@^2.8.3": "@qubit/moment@2.8.3",
      "underscore@>=1.5.0": "underscore@1.7.0",
      "backbone": "backbone@1.1.2",
      "when": "when@3.4.4",
      "@qubit/moment": "@qubit/moment@2.8.3",
      "chai": "chai@1.9.1",
      "mocha": "mocha@1.21.4",
      "index": "../browser",
      "promise": "when@3.4.4"
    },
    "backbone@1.1.2": {
      "underscore": "underscore@1.7.0"
    },
    "chai@1.9.1": {
      "assertion-error": "assertion-error@1.0.0",
      "deep-eql": "deep-eql@0.1.3"
    },
    "mocha@1.21.4": {
      "mkdirp": "mkdirp@0.3.5"
    },
    "deep-eql@0.1.3": {
      "type-detect": "type-detect@0.1.1"
    }
  },
  "packages": [
    {
      "name": "@qubit/moment@2.8.3",
      "main": "./moment.js",
      "location": "node_modules/@qubit/moment"
    },
    {
      "name": "assertion-error@1.0.0",
      "main": "./index",
      "location": "node_modules/chai/node_modules/assertion-error"
    },
    {
      "name": "backbone@1.1.2",
      "main": "backbone.js",
      "location": "node_modules/backbone"
    },
    {
      "name": "chai@1.9.1",
      "main": "./index",
      "location": "node_modules/chai"
    },
    {
      "name": "deep-eql@0.1.3",
      "main": "./index",
      "location": "node_modules/chai/node_modules/deep-eql"
    },
    {
      "name": "mkdirp@0.3.5",
      "main": "./index",
      "location": "node_modules/mocha/node_modules/mkdirp"
    },
    {
      "name": "mocha@1.21.4",
      "main": "./mocha.js",
      "location": "node_modules/mocha"
    },
    {
      "name": "type-detect@0.1.1",
      "main": "./index",
      "location": "node_modules/chai/node_modules/deep-eql/node_modules/type-detect"
    },
    {
      "name": "underscore@1.7.0",
      "main": "underscore.js",
      "location": "node_modules/backbone/node_modules/underscore"
    },
    {
      "name": "when@3.4.4",
      "main": "when",
      "location": "node_modules/when"
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
    return rc.npm(path.join(__dirname, "fixture"), {
      includeDevDeps: true
    }).then(function (config) {
      expect(config).to.deep.equal(outputWithDevDependencies);
    });
  });

  describe("supports node style API", function () {
    it("when no options are used", function (done) {
      rc.npm(path.join(__dirname, "fixture"), function (err, config) {
        expect(config).to.deep.equal(output);
        done();
      });
    });
    it("when options are used", function(done) {
      rc.npm(path.join(__dirname, "fixture"), {
        includeDevDeps: true
      }, function (err, config) {
        expect(config).to.deep.equal(outputWithDevDependencies);
        done();
      });
    });
  });
});