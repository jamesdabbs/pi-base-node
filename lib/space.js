var pb = require('./pi-base');

function Space(data) {
  this.data = data;
}

Space.list = function() { return pb.get('spaces'); }

module.exports = Space
