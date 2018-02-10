(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.namedAvatar = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
function AvatarImage(name, options) {
  this.name = name
  this.options = options
}

AvatarImage.prototype.createSVG = function() {
  var svg = document.createElement('svg')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

  if ('width' in this.options) {
    var width = this.options.width
    var height = 'height' in this.options ? this.options.height : width

    svg.setAttribute('width', width)
    svg.setAttribute('height', height)
  }

  // <rect> background
  var rect = document.createElement('rect')

  rect.setAttribute('fill', this.getBackgroundColor())
  rect.setAttribute('x', 0)
  rect.setAttribute('y', 0)
  rect.setAttribute('width', '100%')
  rect.setAttribute('height', '100%')

  svg.appendChild(rect)

  if (typeof this.name === 'string' && this.name.length > 0) {
    // <text> name
    var text = document.createElement('text')

    text.setAttribute('fill', this.getTextColor())
    text.setAttribute('x', '50%')
    text.setAttribute('y', '50%')
    text.setAttribute('text-anchor', 'middle')
    text.setAttribute('alignment-baseline', 'central')
    text.setAttribute('font-size', this.getFontSize())
    text.textContent = this.name

    svg.appendChild(text)
  }

  return svg
}

AvatarImage.prototype.getTextColor = function() {
  return this.options.textColor
}

AvatarImage.prototype.getFontSize = function() {
  var textWidth = this.name.length * (this.name.charCodeAt(0) < 256 ? 0.75 : 1.5)
  var availableWidth = this.options.width || 32

  var fontSize = Math.round(availableWidth / textWidth)
  if (fontSize < this.options.minFontSize) {
    this.name = this.name[0].toUpperCase()
    fontSize = this.options.minFontSize
  } else if (fontSize > this.options.maxFontSize) {
    fontSize = this.options.maxFontSize
  }

  return fontSize
}

AvatarImage.prototype.getBackgroundColor = function() {
  if ('backgroundColor' in this.options) {
    return this.options.backgroundColor
  }


  // pick from https://material.io/guidelines/style/color.html#color-color-tool
  // Google Material Design Color 500
  var bgColors = this.options.backgroundColors

  var index
  if (this.name) {
    index = this.name.charCodeAt(0) % bgColors.length
  } else {
    index = Math.floor(Math.random() * bgColors.length)
  }

  return bgColors[index]
}

module.exports = AvatarImage

},{}],2:[function(require,module,exports){
var AvatarImage = require('./image')
var AvatarName = require('./name')

function namedAvatar() {
}

namedAvatar.options = {
  nameType: 'firstName', // lastName, initials
  fontFamily: 'Verdana, Geneva, sans-serif',
  backgroundColors: [
    '#F44336', '#E91E63', '#9C27B0',
    '#673AB7', '#3F51B5', '#2196F3',
    '#03A9F4', '#00BCD4', '#009688',
    '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FFC107', '#FF9800',
    '#FF5722', '#795548', '#607D8B',
  ],
  textColor: '#FFF',
  minFontSize: 8,
  maxFontSize: 16,
}

namedAvatar.config = function(options) {
  this.options = options || {}
}

namedAvatar.setImgs = function(imgs, attr) {
  for (var i = 0; i < imgs.length; i++) {
    this.setImg(imgs[i], imgs[i].getAttribute(attr))
  }
}

namedAvatar.setImg = function(img, fullName) {
  var options = Object.assign({}, this.options)
  if (!('width' in options) && img.width) {
    options.width = img.width
  }

  var avatarName = new AvatarName(fullName, options)
  var name = avatarName.getName()

  var avatarImage = new AvatarImage(name, options)
  var svg = avatarImage.createSVG()

  var uri = 'data:image/svg+xml,' + svg.outerHTML
  img.setAttribute('src', uri)
}

module.exports = namedAvatar

},{"./image":1,"./name":3}],3:[function(require,module,exports){
function Name(fullName, options) {
  this.fullName = fullName
  this.options = options
}

Name.prototype.getName = function() {
  var fullName = this.fullName
  if (!fullName) {
    return
  }

  var name = fullName

  var isASCII = fullName.charCodeAt(0) < 256
  if (isASCII) {
    var names = fullName.split(' ')
    switch (this.options.nameType) {
      case 'firstName':
        name = names[names.length - 1]
        break
      case 'lastName':
        name = names[0]
        break
      case 'initials':
        name = ''
        for (var i = 0; i < names.length; i++) {
          name += names[i].charAt(0).toUpperCase()
        }
        break
    }

    if (name.length > 6) {
      name = name.charAt(0).toUpperCase()
    }
  } else {
    switch (this.options.nameType) {
      case 'lastName':
      case 'initials':
        name = fullName.slice(0, 1)
        break
      case 'firstName':
        name = fullName.slice(1)
    }
  }

  return name
}

module.exports = Name

},{}]},{},[2])(2)
});