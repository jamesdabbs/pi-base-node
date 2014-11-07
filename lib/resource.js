var _ = require('lodash');
var pb = require('./pi-base');
var Revision = require('./revision');

'use strict';

function Resource(opts) {
  var resource = function(data) {
    var self = this;

    var setAttributes = function(data) {
      self.id = data.id;
      self.url = opts.endpoint + '/' + self.id;

      _.each(opts.attributes || [], function(attr) {
        self[attr] = data[attr];
      });
    };
    setAttributes(data);

    self.delete = function() { return pb.delete(self.url); }

    self.update = function(data) {
      return pb.put(self.url, data).then(setAttributes);
    };

    self.revisions = function(params) {
      return pb.get(self.url + '/revisions', params).then(function(revisions) {
        return _.map(revisions, function(r) { return new Revision(r); });
      });
    };
  }

  resource.list = function(params) {
    return pb.get(opts.endpoint, params).then(function(objs) {
      return _.map(objs, function(d) {
        return new resource(d);
      });
    });
  };

  resource.first = function(params) {
    return resource.list(params).then(function(objs) {
      return objs[0]
    });
  };

  resource.find = function(id) {
    return pb.get(opts.endpoint + '/' + id).then(function(d) {
      return new resource(d);
    });
  }

  resource.create = function(data) {
    return pb.post(opts.endpoint, data).then(function(d) {
      return new resource(d);
    });
  };

  return resource;
}

module.exports = Resource;
