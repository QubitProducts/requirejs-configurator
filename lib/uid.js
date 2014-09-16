module.exports.parse = function (pkgId) {
  var parts = pkgId.split(/@([^@]+)$/);
  return {
    name: parts[0],
    version: parts[1]
  };
};

module.exports.create = function (name, version) {
  return name + "@" + version;
};