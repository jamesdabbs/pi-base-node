'use strict';

var Space = require('../lib/space');

describe('Space', function () {
  it('can list spaces', function() {
    expect(Space.list()).to.eventually.have.length(50);
  });
});
