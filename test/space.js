'use strict';

var Space = require('../lib/space');

describe('Space', function () {
  it('can list', function() {
    expect(Space.list()).to.eventually.have.length(50);
  });

  it('can get a page at a time', function() {
    Space.list({page: 2}).then(function(spaces) {
      expect(spaces[0].name).to.eq('Space 54');
    });
  });

  it('can choose the page size', function() {
    expect(Space.list({perPage: 10})).to.eventually.have.length(10);
  });

  it('caps the page size', function() {
    expect(Space.list({perPage: 100})).to.eventually.have.length(50);
  });

  it('can find by id', function() {
    expect(Space.find(1)).to.eventually.have.property('name', 'Space 1');
  });

  it('requires authentication to create', function() {
    expect(Space.create({name: 'New Space'})).to.be.rejectedWith('401');
  });

  it('allows logged-in users to create');
  it('validates create data');

  it.skip('requires admin access to update', function() {
    Space.find(7).then(function(space) {
      space.update({description: 'Updated description'}).then(function() {
        expect(space.description).to.eq('Updated description');
      });
    });
  });

  it('allows admins to update');
  it('validates updates');
  it('tracks revisions');

  it.skip('requires admin access to delete', function() {
    Space.find(99).then(function(space) {
      expect(space.delete()).to.be.rejectedWith('403');
    });
  });

  it('allows admins to delete');
});
