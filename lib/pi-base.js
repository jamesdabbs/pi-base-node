var rp = require('request-promise');

var call = function(endpoint, opts) {
  return rp('http://localhost:3000/v1/' + endpoint).then(function(res) {
    return JSON.parse(res);
  });
}

var get = function(endpoint) { return call(endpoint, {method: 'GET'}) };

module.exports = {
  get: get
}
