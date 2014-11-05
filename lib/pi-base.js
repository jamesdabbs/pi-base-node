var rp = require('request-promise');
var qs = require('qs');

var call = function(endpoint, opts) {
  opts.url = 'http://localhost:3000/v1/' + endpoint;
  opts.headers = opts.headers || {};
  opts.headers['Accept'] = 'application/json';

  return rp(opts).then(function(res) {
    return JSON.parse(res);
  }).error(function(res) {
    // FIXME: there has to be a better way to handle this ...
    throw res.statusCode + ': ' + JSON.stringify(res.error);
  });
}

var PiBase = {
  get: function(endpoint, params) {
    if (params) {
      endpoint += '?' + qs.stringify(params);
    };
    return call(endpoint, {method: 'GET'});
  },
  post: function(endpoint, data) {
    return call(endpoint, {method: 'POST', body: data, json: true});
  },
  put: function(endpoint, data) {
    return call(endpoint, {method: 'PUT', body: data, json: true});
  },
  delete: function(endpoint) {
    return call(endpoint, {method: 'DELETE'});
  }
};

module.exports = PiBase;
