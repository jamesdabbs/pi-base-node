var pb = require('./pi-base');

'use strict';

function Resource(opts) {
  var resource = function(data) {
    var self = this;

    self.id = data.id;
    _.each(opts.attributes || [], function(attr) {
      self[attr] = data[attr];
    });

    self.url = opts.endpoint + '/' + self.id;

    self.delete = function() { return pb.delete(self.url); }
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
