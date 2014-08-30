var R = require("ramda");
var path = require("path");
var fs = require("fs");
var when = require("when");
var nodefn = require("when/node/function");
var uid = require("./uid");
var readFile = nodefn.lift(fs.readFile);

module.exports = generate;

function generate(options, cb) {
  // an array with package UIDs (name@version)
  var dependencies = options.dependencies;
  // a function that can resolve paths of packages
  var resolve = options.resolve;
  // support node style API
  if (resolve.length === 4) {
    resolve = nodefn.lift(resolve);
  }
  // a function that generates a location field for the require.js package config
  var location = options.location;

  // a function that creates a single package entry
  var createPackageEntry = packageEntryCreator(location);

  // collect the manifests of the entire dependency tree
  var manifests = collectManifests(dependencies, resolve);

  var config = when.try(createConfig, manifests, createPackageEntry);

  // support node style API
  if (cb) nodefn.bindCallback(config, cb);

  return config;
}

function createConfig(manifests, createPackageEntry) {
  return {
    map: makeMap(manifests),
    packages: makePackages(manifests, createPackageEntry)
  };
}

function collectManifests(dependencies, resolve) {
  var moduleManifests = {};
  var add = addPackage.bind(null, moduleManifests, null, resolve);
  return when.map(dependencies, add).then(function () {
    return moduleManifests;
  });
}

function addPackage(moduleManifests, basedir, resolve, pkg) {
  // check if already processed or processing
  if (moduleManifests[pkg]) {
    return;
  } else {
    moduleManifests[pkg] = true;
  }

  return readManifest(pkg, basedir, resolve).then(function (manifest) {
    moduleManifests[pkg] = manifest;
    return when.all(mapObj(function (version, pkg) {
      return addPackage(moduleManifests, manifest._location, resolve, uid.create(pkg, version));
    }, manifest.dependencies));
  });
}

function readManifest(pkgUid, basedir, resolve) {
  var pkg = uid.parse(pkgUid);
  return resolve(pkg.name, pkg.version, basedir).then(function (modulePath) {
    return readFile(path.join(modulePath, "package.json")).then(function (moduleConfig) {
      var manifest = JSON.parse(moduleConfig.toString());
      manifest._location = modulePath;
      return manifest;
    });
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
    }, manifest.dependencies);
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

function makePackages(manifests, createPackageEntry) {
  return R.pipe(
    R.values,
    R.map(createPackageEntry),
    R.uniqWith(R.eqProps("name"))
  )(manifests);
}

function packageEntryCreator(location) {
  return function createPackageEntry(manifest) {
    var versionedName = uid.create(manifest.name, manifest.version);
    var packageConfig = {
      name: versionedName,
      main: manifest.main || "index",
      location: location(manifest, manifest._location)
    };
    if (manifest.browser) {
      packageConfig.main = manifest.browser;
    }
    return packageConfig;
  };
}

function mapObj(fn, obj) {
  return R.values(R.mapObj.idx(fn, obj));
}