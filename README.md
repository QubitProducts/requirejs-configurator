# Require.js configurator

A generic require.js map/package configuration generator.

# Usage

The typical usage for npm projects is simple

```js
var rc = require("requirejs-configurator");
```

Then use promise API

```js
rc.npm("path/to/my/project").then(function () {
  console.log(config);
});
```

or node style API

```js
rc.npm("path/to/my/project", function (err, config) {
  console.log(config);
});
```

Use `generate` to create configurations from non typical file layouts, e.g.

```js
rc.generate({
  dependencies: ["foo@^1.0.0", "bar@*"],
  resolve: function (name, version, basedir, cb) {
    // npm config generator uses the `node-resolve` which uses node's `node_modules` traversal algorithm, but with a custom resolver we could do other things, like have our files laid out in a flat structure
    cb(null path.resolve(__dirname, "base", name, version));
  },
  location: function (manifest) {
    // this depends on how your packages are laid out on the disk or how they're served via your web
    // server. 
    return "base/" + manifest.name + "/" + manifest.version;
  }
});

```

Note that the `options.resolve` function can either take a callback or return a promise.

Finally, if you want something in between, you can pass any of the above options into the `npm` function. E.g.

```js
rc.npm("path/to/my/project", {location: customLocation}, function (err, config) {
  // this config is similar to the first example, but the package location in the config
  // is computed using the custom function
  console.log(config);
});
```