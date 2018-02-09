var assert = require('assert');
var Name = require('../src/name');

describe('#getName()', function() {
  it('get last name from chinese', function() {
    var name = new Name('张小明')
    assert.equal(name.getName(), '小明');
  })
})
