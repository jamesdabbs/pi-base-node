'use strict';

var rp = require('request-promise');

describe('requesting', function () {
  it('should be able to make a request', function() {
    var s = rp('http://localhost:3000/test').then(function(response) {
      return JSON.parse(response).status;
    });

    expect(s).to.eventually.eq("ok");
  });
});
