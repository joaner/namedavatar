var assert = require('assert');
var AvatarName = require('../src/name');
var AvatarImage = require('../src/image');

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
  it('get initials from single-char chinese', function() {
    var name = new AvatarName('李', { nameType: 'initials' })
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
  it('get initials from single-char english', function() {
    var name = new AvatarName('T', { nameType: 'initials' })
    assert.equal(name.getName(), 'T');
  })
})

describe('#getSVGString()', function() {
  const imageOptions = {
    // font family list
    fontFamily: 'Verdana, Geneva, sans-serif',
  
    // pick from https://material.io/guidelines/style/color.html#color-color-tool
    backgroundColors: [
      '#F44336', '#E91E63', '#9C27B0',
      '#673AB7', '#3F51B5', '#2196F3',
      '#03A9F4', '#00BCD4', '#009688',
      '#4CAF50', '#8BC34A', '#CDDC39',
      '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722', '#795548', '#607D8B',
    ],
  
    // font color default white
    textColor: '#FFF',
  
    // font size default between 8 and 16
    minFontSize: 8,
    maxFontSize: 16,
  }

  it('get svg string', function() {
    var image = new AvatarImage('李连杰', imageOptions)
    var html = image.createSVGString()
    assert.equal(html[0], '<');
  })
})

describe('#getSVGString()', function() {
  const imageOptions = {
    // font family list
    fontFamily: 'Verdana, Geneva, sans-serif',

    // pick from https://material.io/guidelines/style/color.html#color-color-tool
    backgroundColors: [
      '#F44336', '#E91E63', '#9C27B0',
      '#673AB7', '#3F51B5', '#2196F3',
      '#03A9F4', '#00BCD4', '#009688',
      '#4CAF50', '#8BC34A', '#CDDC39',
      '#FFEB3B', '#FFC107', '#FF9800',
      '#FF5722', '#795548', '#607D8B',
    ],

    // font color default white
    textColor: '#FFF',

    // font size default between 8 and 16
    minFontSize: 8,
    maxFontSize: 16,
  }

  it('get svg string', function() {
    var image = new AvatarImage('李连杰', imageOptions)
    var html = image.createSVGString()
    assert.equal(html[0], '<');
  })
})
