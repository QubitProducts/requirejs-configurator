# requirejs-configurator

A generic require.js map/package configuration generator. It can generate require.js from arbitrary package layout on disk.

*requirejs-configurator* is not intended as the best workflow in terms of web app development (check out webpack, browserify, Rave.js). It's more of a building block for other tools. It's quite a specialised package so to speak. It supports `npm`'s package layout out of the box so it could prove to be useful for simple Require.js/Cajon based projects.

# Programmatic usage

`requirejs-configurator` can be used to generate configuration for npm based projects.

```js
var rc = require("requirejs-configurator");
```

There is a promise API

```js
rc.npm("path/to/my/project").then(function () {
  console.log(config);
});
```

And the node style callback API

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
    // npm config generator uses the `node-resolve` which uses node"s
    // `node_modules` traversal algorithm. By providing a custom resolver
    // it's possible to support different package layouts, e.g. a flat
    // structure with package@version directories, etc.
    cb(null path.resolve(__dirname, "base", name, version));
  }
});

```

Note that the `options.resolve` function can either take a callback or return a promise.

# Command line usage

There's a small command line tool bundled with `requirejs-configurator` which can generate a configuration file for npm based projects, use it like so:

```
npm install -g requirejs-configurator
```

and then

```
requirejs-configurator --npm . > config.js
```

This assumes that `node_modules` will be served at your require.js baseUrl. If that's not the case, you'll have to use the programmatic API and modify the generated configuration by looping over the packages array and updating the location fields.

# Include devDependencies

NPM package.json devDependencies can be included programatically:

```js
```js
rc.npm("path/to/my/project").then(function () {
  console.log(config);
}, {
  includeDevDeps: true
});
```

or

```js
rc.npm("path/to/my/project", function (err, config) {
  console.log(config);
}, {
  includeDevDeps: true
});
```
```

And using the CLI

```sh
requirejs-configurator --npm --include-dev-dependencies . > config.js
```

# Example output

Here is what the output of generating configuration for `requirejs-configurator` itself looks like (+ Backbone just to demonstrate nested dependencies). With such configuration, it's then possible to call `require("lodash")` or `require("lodash@2.4.1")` or `require("lodash@^2.4.1")` and all nested dependencies are resolved correctly since they're configured in the map.

```js
{
  map: {
    'backbone@1.1.2': {
      'underscore': 'underscore@1.7.0'
    },
    '*': {
      'backbone': 'backbone@1.1.2',
      'lodash': 'lodash@^2.4.1',
      'lodash@^2.4.1': 'lodash@2.4.1',
      'ramda': 'ramda@^0.4.0',
      'ramda@^0.4.0': 'ramda@0.4.0',
      'resolve': 'resolve@^1.0.0',
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

# Example project

See a fully working example [over here](example).
