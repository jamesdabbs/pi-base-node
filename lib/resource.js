var pb = require('./pi-base');

'use strict';

function Resource(opts) {
  var resource = function(data) {
    var self = this;

    _.each(opts.attributes || [], function(attr) {
      self[attr] = data[attr];
    });
  }

  resource.list = function() {
    return pb.get(opts.endpoint).then(function(objs) {
      return _.map(objs, function(d) {
        return new resource(d);
      });
    });
  };

  resource.find = function(id) {
    return pb.get(opts.endpoint + '/' + id).then(function(d) {
      return new resource(d);
    });
  }

  return resource;
}

module.exports = Resource;
