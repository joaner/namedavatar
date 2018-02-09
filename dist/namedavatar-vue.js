(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.namedAvatarVue = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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

  return svg
}

AvatarImage.prototype.getTextColor = function() {
  return '#FFF'
}

AvatarImage.prototype.getFontSize = function() {
  var textWidth = this.name.length * (this.name.charCodeAt(0) < 256 ? 0.75 : 1.5)
  var availableWidth = this.options.width || 32

  var fontSize = Math.round(availableWidth / textWidth)
  if (fontSize < 8) {
    this.name = this.name[0]
  } else if (fontSize > 16) {
    fontSize = 16
  }

  return fontSize
}

AvatarImage.prototype.getBackgroundColor = function() {
  if ('backgroundColor' in this.options) {
    return this.options.backgroundColor
  }


  // pick from https://material.io/guidelines/style/color.html#color-color-tool
  // Google Material Design Color 500
  var bgColors = [
    '#F44336', '#E91E63', '#9C27B0',
    '#673AB7', '#3F51B5', '#2196F3',
    '#03A9F4', '#00BCD4', '#009688',
    '#4CAF50', '#8BC34A', '#CDDC39',
    '#FFEB3B', '#FFC107', '#FF9800',
    '#FF5722', '#795548', '#607D8B',
  ]

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

namedAvatar.options = {}
namedAvatar.config = function(options) {
  this.options = options || {}
}

namedAvatar.setImgs = function(imgs) {
  for (var i = 0; i < imgs.length; i++) {
    this.setImg(imgs[i], imgs[i].getAttribute('data-name'))
  }
}

namedAvatar.setImg = function(img, fullName) {
  var options = Object.create({}, this.options)
  if (!('width' in options) && img.width) {
    options.width = img.width
  }

  var avatarName = new AvatarName(fullName, this.options)
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

  var firstCharCode = fullName.charCodeAt()
  if (firstCharCode > 256) {
    return fullName.slice(1)
  }
  var names = fullName.split(' ')

  // if only a name
  if (names.length === 1) {
    // if too much long
    if (names[0].length > 6) {
      // show first code
      return names[0].charAt(0).toUpperCase()
    }

    return names[0]
  }

  var lastName = names[names.length - 1]
  return lastName
}

module.exports = Name

},{}],4:[function(require,module,exports){
var namedAvatar = require('../index')

module.exports = function (el, binding) {
  // if image is load ok
  if (el instanceof HTMLImageElement) {
    if (el.naturalWidth) {
      return
    }
  }

  namedAvatar.setImg(el, binding.value)
}

},{"../index":2}],5:[function(require,module,exports){
var directive = require('./directive')

module.exports = {
  install: function (Vue, options) {

  },

  directive: directive,
}

},{"./directive":4}]},{},[5])(5)
});