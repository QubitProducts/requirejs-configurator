var rc = require('../')
var path = require('path')
rc.npm(path.join(__dirname, '..')).then(function (config) {
  console.log(config)
})
