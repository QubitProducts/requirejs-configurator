var R = require("ramda");
module.exports = R.curry(function invertObj(obj) {
  var newObj = {};
  R.mapObj.idx(function (val, key) {
    newObj[val] = key;
  }, obj);
  return newObj;
});