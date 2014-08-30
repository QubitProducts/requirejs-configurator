var R = require("ramda");
module.exports = function mapObj(fn, obj) {
  return R.values(R.mapObj.idx(fn, obj));
};