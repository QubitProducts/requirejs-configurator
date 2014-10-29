var R = require("ramda");

module.exports = aliasBrowser;

function aliasBrowser(pkgMap, browser) {
  // browser contains smth like {'jquery': '@scope/jquery', 'underscore': '../lib/foo'}
  if (browser && !isString(browser)) {
    // update the map based on the browser aliases
    R.mapObj.idx(function (to, from) {
      pkgMap[from] = pkgMap[to] || to;
    }, browser);
  }
  return pkgMap;
}

function isString(o) {
  return (Object.prototype.toString.call(o) === "[object String]");
}