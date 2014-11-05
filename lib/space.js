'use strict';

var Resource = require('./resource');

var Space = Resource({
  endpoint: 'spaces',
  attributes: ['name', 'description', 'proofOfTopology']
});

module.exports = Space;
