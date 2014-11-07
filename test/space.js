'use strict';

var PiBase = require('../lib/pi-base');
var Space = require('../lib/space');

describe('Space', function () {
  before(PiBase.reset);
  beforeEach(PiBase.logout);

  it('can list', function() {
    expect(Space.list()).to.eventually.have.length(50);
  });

  it('can get a page at a time', function() {
    Space.list({page: 1}).then(function(p1) {
      Space.list({page: 2}).then(function(p2) {
        expect(p1[0].name).not.to.eq(p2[0].name);
      });
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
    expect(Space.create({name: 'New Space'})).to.be.rejectedWith(401);
  });

  it('allows logged-in users to create', function() {
    PiBase.login('user');
    expect(Space.create({name: 'New Space', description: '-'})).to.eventually.have.property('name', 'New Space');
  });

  it('validates create data', function() {
    PiBase.login('user');
    expect(Space.create({name: 'New Space'})).to.be.rejectedWith(422);
  });

  it('requires admin access to update', function() {
    PiBase.login('user');
    Space.find(7).then(function(space) {
      expect(space.update({description: 'Updated description'})).to.be.rejectedWith(403);
    });
  });

  it('allows admins to update', function() {
    PiBase.login('admin');
    Space.find(7).then(function(space) {
      space.update({description: 'Updated description'}).then(function() {
        expect(space.description).to.eq('Updated description');
      });
    });
  });

  it('validates updates', function() {
    PiBase.login('admin');
    Space.find(7).then(function(space) {
      expect(space.update({description: ''})).to.be.rejectedWith(422);
    });
  });

  it('tracks revisions', function() {
    PiBase.login('admin');
    Space.find(8).then(function(space) {
      space.update({description: 'New description'}).then(function() {
        space.update({description: 'Newer description'}).then(function() {
          space.revisions().then(function(revisions) {
            expect(revisions[0].body.description).to.eq('Newer description');
            expect(revisions[1].body.description).to.eq('New description');
          });
        });
      });
    });
  });

  it('requires admin access to delete', function() {
    Space.first().then(function(space) {
      expect(space.delete()).to.be.rejectedWith(403);
    });
  });

  it('allows admins to delete', function() {
    PiBase.login('admin');

    Space.first().then(function(space) {
      space.delete().then(function() {
        expect(Space.find(space.id)).to.be.rejectedWith(404);
      });
    });
  });
});
