var rp = require('request-promise');

var call = function(endpoint, opts) {
  opts.url = 'http://localhost:3000/v1/' + endpoint;
  return rp(opts).then(function(res) {
    return JSON.parse(res);
  });
  //.error(function(res) {
  //  var e = JSON.parse(res.error);
  //  e.status = res.statusCode;
  //  return e;
  //});
}

var PiBase = {
  get: function(endpoint) { return call(endpoint, {method: 'GET'}) },
  delete: function(endpoint) { return call(endpoint, {method: 'DELETE'}) }
};

module.exports = PiBase;
