var assert = require('assert');
var AvatarName = require('../src/name');

describe('#getName()', function() {
  // chinese name support
  it('get last name from chinese', function() {
    var name = new AvatarName('李连杰', { nameType: 'lastName' })
    assert.equal(name.getName(), '李');
  })
  it('get first name from chinese', function() {
    var name = new AvatarName('李连杰', { nameType: 'firstName' })
    assert.equal(name.getName(), '连杰');
  })
  it('get initials from chinese', function() {
    var name = new AvatarName('李连杰', { nameType: 'initials' })
    assert.equal(name.getName(), '李');
  })

  // english name support
  it('get last name from english', function() {
    var name = new AvatarName('Tom Hanks', { nameType: 'lastName' })
    assert.equal(name.getName(), 'Hanks');
  })
  it('get first name from english', function() {
    var name = new AvatarName('Tom Hanks', { nameType: 'firstName' })
    assert.equal(name.getName(), 'Tom');
  })

  it('get initials from english', function() {
    var name = new AvatarName('Tom Hanks', { nameType: 'initials' })
    assert.equal(name.getName(), 'TH');
  })
})
