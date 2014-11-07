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

var headers = {};

var PiBase = {
  login: function(token) { headers.Authorization = token; },
  logout: function() { delete headers.Authorization; },

  reset: function() {
    PiBase.login('admin');
    // FIXME: duplication here
    return rp.post('http://localhost:3000/test/reset');
  },

  get: function(endpoint, params) {
    if (params) {
      endpoint += '?' + qs.stringify(params);
    };
    return call(endpoint, {method: 'GET', headers: headers});
  },
  post: function(endpoint, data) {
    return call(endpoint, {method: 'POST', form: data, headers: headers});
  },
  put: function(endpoint, data) {
    return call(endpoint, {method: 'PUT', form: data, headers: headers});
  },
  delete: function(endpoint) {
    return call(endpoint, {method: 'DELETE', headers: headers});
  }
};

module.exports = PiBase;
