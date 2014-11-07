'use strict';

var _ = require('lodash');

function Revision(data) {
  var self = this;

  _.each(data || {}, function(val, key) {
    self[key] = val;
  });

  self.body = JSON.parse(self.body);
};

module.exports = Revision;

