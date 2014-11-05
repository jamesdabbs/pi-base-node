'use strict';

var Space = require('../lib/space');

describe('Space', function () {
  it('can list', function() {
    expect(Space.list()).to.eventually.have.length(50);
  });

  it('can get a page at a time');
  it('can choose the page size');
  it('caps the page size');

  it('can find by id', function() {
    expect(Space.find(1)).to.eventually.have.property('name', 'Space 1');
  });

  it('requires authentication to create');
  it('allows logged-in users to create');
  it('validates create data');

  it('requires admin access to update');

  it('allows admins to update');
  it('validates updates');
  it('tracks revisions');

  it('requires admin access to delete', function() {
    Space.find(99).then(function(space) {
      // FIXME: ensure that we reject with somethign reflecting the forbidden status
      expect(space.delete()).to.be.rejected;
    });
  });

  it('allows admins to delete');
});
