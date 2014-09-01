var rc = require("../");
var path = require("path");
var expect = require("chai").expect;

var output = {
  map: {
    'backbone@1.1.2': {
      'underscore': 'underscore@1.7.0'
    },
    '*': {
      'backbone': 'backbone@1.1.2',
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
    name: 'underscore@1.7.0',
    main: 'underscore.js',
    location: 'node_modules/backbone/node_modules/underscore'
  }]
};

describe("rc.npm", function () {
  it("generates configuration for an npm based project", function () {
    return rc.npm(path.join(__dirname, "fixture")).then(function (config) {
      expect(config).to.deep.equal(output);
    });
  });
  it("supports node style API", function (done) {
    rc.npm(path.join(__dirname, "fixture"), function (err, config) {
      expect(config).to.deep.equal(output);
      done();
    });
  });
});