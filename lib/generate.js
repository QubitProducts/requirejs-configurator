var R = require("ramda");
var _ = require("lodash");
var path = require("path");
var fs = require("fs");
var when = require("when");
var nodefn = require("when/node/function");
var uid = require("./uid");
var readFile = nodefn.lift(fs.readFile);

module.exports = generate;

function generate(options) {
  var moduleManifests = {};

  var dependencies = options.dependencies;
  var resolve = options.resolve;
  var location = options.location;

  var add = addPackage.bind(this, moduleManifests, null, resolve);
  return when.map(dependencies, add).then(function () {
    return makeMap(moduleManifests, createPackageEntry(location)).then(function (map) {
      return {
        map: map,
        packages: makePackages(moduleManifests, createPackageEntry(location))
      };
    });
  });
}

function addPackage(moduleManifests, basedir, resolve, pkg) {
  if (moduleManifests[pkg]) {
    return;
  }

  // mark this one as "processing" so that future calls
  // to addDependency don't touch this anymore
  moduleManifests[pkg] = true;

  return readManifest(pkg, basedir, resolve).then(function (manifest) {
    moduleManifests[pkg] = manifest;
    return when.all(_.map(manifest.dependencies, function (version, pkg) {
      return addPackage(moduleManifests, manifest._location, resolve, uid.create(pkg, version));
    }));
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

function makeMap(manifests, createPackageEntry) {
  var map = {};

  map["*"] = {};

  _.each(manifests, function (manifest, semverName) {
    var pkg = createPackageEntry(manifest);
    map[pkg.name] = _.reduce(manifest.dependencies, function (singleMap, version, dependency) {
      var depManifest = manifests[uid.create(dependency, version)];
      var depPkg = createPackageEntry(depManifest);
      singleMap[dependency] = depPkg.name;
      return singleMap;
    }, {});
    if (!_.size(map[pkg.name])) {
      delete map[pkg.name];
    }

    var specificName = pkg.name;
    if (specificName !== semverName) {
      map["*"][semverName] = specificName;
    }
  });

  return when(map);
}

function makePackages(manifests, createPackageEntry) {
  return R.pipe(
    R.values,
    R.map(createPackageEntry),
    R.uniqWith(R.eqProps("name"))
  )(manifests);
}

function createPackageEntry(location) {
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