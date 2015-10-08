var R = require("ramda");
var path = require("path");
var fs = require("fs");
var when = require("when");
var nodefn = require("when/node/function");
var uid = require("pkguid");
var aliasBrowser = require("./alias_browser");
var mapObj = require("./map_obj");
var readFile = nodefn.lift(fs.readFile);

module.exports = generate;

function generate(options, cb) {
  // an array with package UIDs (name@version)
  var dependencies = options.dependencies;
  // a function that can resolve paths of packages
  var resolve = options.resolve;
  // a function that reads the pkg manifest
  var readManifest = options.readManifest || defaultReadManifest;

  // support node style API
  if (resolve.length === 4) {
    resolve = nodefn.lift(resolve);
  }

  // collect the manifests of the entire dependency tree
  var manifests = collectManifests(dependencies, resolve, readManifest);

  var config = when.try(createConfig, manifests);

  // support node style API
  if (cb) nodefn.bindCallback(config, cb);
  // support promise API
  return config;
}

function createConfig(manifests) {
  return {
    map: makeMap(manifests),
    packages: makePackages(manifests)
  };
}

function collectManifests(dependencies, resolve, readManifest) {
  var moduleManifests = {};
  var add = addPackage.bind(null, moduleManifests, null, resolve, readManifest);
  return when.map(dependencies, add).then(function () {
    return moduleManifests;
  });
}

function addPackage(moduleManifests, basedir, resolve, readManifest, pkg) {
  // check if already processed or processing
  if (moduleManifests[pkg]) {
    return;
  } else {
    moduleManifests[pkg] = true;
  }

  return getManifest(resolve, readManifest, pkg, basedir).then(function (manifest) {
    moduleManifests[pkg] = manifest;
    return when.all(mapObj(function (version, pkg) {
      return addPackage(moduleManifests, manifest._location, resolve, readManifest, uid.create(pkg, version));
    }, allDependencies(manifest)));
  });
}

function getManifest(resolve, readManifest, pkgUid, basedir) {
  var pkg = uid.parse(pkgUid);
  return resolve(pkg.name, pkg.version, basedir).then(function (pkgPath) {
    return readManifest(pkgPath).then(function (manifest) {
      manifest._location = pkgPath
      return manifest
    })
  })
}

function defaultReadManifest(pkgPath) {
  return readFile(path.join(pkgPath, "package.json")).then(function (moduleManifest) {
    return JSON.parse(moduleManifest.toString());
  });
}

function makeMap(manifests) {
  var map = {};

  map["*"] = {};

  mapObj(function (manifest, semverName) {
    var pkgUid = uid.create(manifest.name, manifest.version);
    map[pkgUid] = R.mapObj.idx(function (version, dependency) {
      var depManifest = manifests[uid.create(dependency, version)];
      return uid.create(depManifest.name, depManifest.version);
    }, allDependencies(manifest));

    map[pkgUid] = aliasBrowser(map[pkgUid], manifest.browser);

    if (R.isEmpty(R.values(map[pkgUid]))) {
      delete map[pkgUid];
    }

    var specificName = pkgUid;
    if (specificName !== semverName) {
      map["*"][semverName] = specificName;
    }
  }, manifests);

  return map;
}

function allDependencies(manifest) {
  return R.mixin(manifest.peerDependencies, manifest.dependencies);
}

function makePackages(manifests) {
  return R.pipe(
    R.values,
    R.map(createPackageEntry),
    R.uniqWith(R.eqProps("name"))
  )(manifests);
}

function createPackageEntry(manifest) {
  var versionedName = uid.create(manifest.name, manifest.version);
  var packageConfig = {
    name: versionedName,
    main: manifest.main || "index",
    // by default, we put in the absolute path of the module as the location
    // this typically won't be useful, but can be rewritten by the caller
    // after the config is generated
    location: manifest._location
  };

  if (isString(manifest.browser)) {
    packageConfig.main = manifest.browser;
  }

  return packageConfig;
}

function isString(o) {
  return (Object.prototype.toString.call(o) === "[object String]");
}