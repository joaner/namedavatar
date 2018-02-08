var assert = require('assert');
var Name = require('../src/name');

describe('#getName()', function() {
  const name = new Name('张小明')
  it('chinese name', function() {
    assert.equal(name.getName(), '小明');
  });
});
