var rc = require("../");
var path = require("path");
var expect = require("chai").expect;

var output = {
  map: {
    'backbone@1.1.2': {
      underscore: 'underscore@1.7.0'
    },
    '*': {
      'backbone': 'backbone@1.1.2',
      'lodash': 'lodash@^2.4.1',
      'lodash@^2.4.1': 'lodash@2.4.1',
      'ramda': 'ramda@^0.4.0',
      'ramda@^0.4.0': 'ramda@0.4.0',
      "resolve": "resolve@^1.0.0",
      'resolve@^1.0.0': 'resolve@1.0.0',
      'when@^3.4.4': 'when@3.4.4',
      'when': 'when@^3.4.4',
      'underscore@>=1.5.0': 'underscore@1.7.0'
    }
  },
  packages: [{
    name: 'backbone@1.1.2',
    main: 'backbone.js',
    location: 'node_modules/backbone'
  }, {
    name: 'lodash@2.4.1',
    main: 'dist/lodash.js',
    location: 'node_modules/lodash'
  }, {
    name: 'ramda@0.4.0',
    main: 'ramda.js',
    location: 'node_modules/ramda'
  }, {
    name: 'resolve@1.0.0',
    main: 'index.js',
    location: 'node_modules/resolve'
  }, {
    name: 'when@3.4.4',
    main: 'when',
    location: 'node_modules/when'
  }, {
    name: 'underscore@1.7.0',
    main: 'underscore.js',
    location: 'node_modules/backbone/node_modules/underscore'
  }]
};

describe("rc.npm", function () {
  it("generates configuration for an npm based project", function () {
    return rc.npm(path.join(__dirname, "..")).then(function (config) {
      expect(config).to.deep.equal(output);
    });
  });
  it("supports node style API", function (done) {
    rc.npm(path.join(__dirname, ".."), function (err, config) {
      expect(config).to.deep.equal(output);
      done();
    });
  });
});