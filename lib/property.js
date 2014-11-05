'use strict';

var Resource = require('./resource');

var Property = Resource({
  endpoint: 'properties',
  attributes: ['name', 'description']
});

module.exports = Property;
