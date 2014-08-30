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