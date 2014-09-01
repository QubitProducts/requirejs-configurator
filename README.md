# Require.js configurator

A generic require.js map/package configuration generator.

# Usage

`requirejs-configurator` can be used to generate configuration for npm based projects.

```js
var rc = require("requirejs-configurator");
```

You can use the promise API

```js
rc.npm("path/to/my/project").then(function () {
  console.log(config);
});
```

Or the node style API

```js
rc.npm("path/to/my/project", function (err, config) {
  console.log(config);
});
```

Use `generate` for more advanced use cases, e.g.

```js
rc.generate({
  dependencies: ["foo@^1.0.0", "bar@*"],
  resolve: function (name, version, basedir, cb) {
    // npm config generator uses the `node-resolve` which uses node's `node_modules` traversal algorithm, but with a custom resolver we could do other things, like have our files laid out in a flat structure
    cb(null path.resolve(__dirname, "base", name, version));
  }
});

```

Note that the `options.resolve` function can either take a callback or return a promise.

# Example Output

Here is what the output of generating configuration for `requirejs-configurator` itself looks like (+ Backbone just to demonstrate nested dependencies). With such configuration, it's then possible to call `require("lodash")` or `require("lodash@2.4.1") or `require("lodash@^2.4.1")` and all nested dependencies are resolved correctly since they're configured in the map.

```js
{
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
```
