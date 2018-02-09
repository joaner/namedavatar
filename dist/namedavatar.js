(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.namedAvatar = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
function AvatarImage(name, options) {
  this.name = name
  this.options = options
}

AvatarImage.prototype.createSVG = function() {
  var svg = document.createElement('svg')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

  if ('width' in this.options) {
    var width = options.width
    var height = 'height' in this.options ? this.options.height : width

    svg.setAttributes('width', width)
    svg.setAttributes('height', height)
  }

  // <rect> background
  var rect = document.createElement('rect')

  rect.setAttribute('fill', this.getBackgroundColor())
  rect.setAttribute('x', 0)
  rect.setAttribute('y', 0)
  rect.setAttribute('width', '100%')
  rect.setAttribute('height', '100%')

  svg.appendChild(rect)

  var text = document.createElement('text')

  text.setAttribute('fill', this.getTextColor())
  text.setAttribute('x', '50%')
  text.setAttribute('y', '50%')
  text.setAttribute('text-anchor', 'middle')
  text.setAttribute('alignment-baseline', 'central')
  text.setAttribute('font-size', 12)
  text.textContent = this.name

  svg.appendChild(text)

  return svg
}

AvatarImage.prototype.getTextColor = function() {
  return '#FFF'
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

function NamedAvatar() {
}

NamedAvatar.options = {}
NamedAvatar.config = function(options) {
  this.options = options || {}
}

NamedAvatar.setImgs = function(imgs) {
  for (var i = 0; i < imgs.length; i++) {
    this.setImg(imgs[i], imgs[i].getAttribute('data-name'))
  }
}

NamedAvatar.setImg = function(img, fullName) {
  var avatarName = new AvatarName(fullName, this.options)
  var name = avatarName.getName()

  var avatarImage = new AvatarImage(name, this.options)
  var svg = avatarImage.createSVG()

  console.log(window.h = svg.outerHTML)
  var uri = 'data:image/svg+xml,' + svg.outerHTML
  img.setAttribute('src', uri)
}

module.exports = NamedAvatar

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

},{}]},{},[2])(2)
});