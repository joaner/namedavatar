(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.namedAvatarVue = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
/**
 * namedAvatar image
 * @module AvatarImage
 */

/**
 * Create Image from name
 * @class
 * @param {string} name - picked name
 * @param {Object} options - options
 */
function AvatarImage(name, options) {
  this.name = name
  this.options = options
}

/**
 * Create SVG node
 * @param {string} name - picked name
 * @param {Object} options - options
 * @return {HTMLElement} - svg node
 */
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

/**
 * get text color
 * @return {string} - css color format
 */
AvatarImage.prototype.getTextColor = function() {
  return this.options.textColor
}

/**
 * get text font size
 * @return {number} - px number
 */
AvatarImage.prototype.getFontSize = function() {
  var textWidth = this.name.length * (this.name.charCodeAt(0) < 256 ? 0.75 : 1.5)
  var availableWidth = this.options.width || 32

  var fontSize = Math.round(availableWidth / textWidth)
  if (fontSize < this.options.minFontSize) {
    this.name = this.name[0].toUpperCase()
    fontSize = this.options.maxFontSize
  } else if (fontSize > this.options.maxFontSize) {
    fontSize = this.options.maxFontSize
  }

  return fontSize
}

/**
 * get background color
 * @return {string} - css background-color format
 */
AvatarImage.prototype.getBackgroundColor = function() {
  if ('backgroundColor' in this.options) {
    return this.options.backgroundColor
  }

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
/**
 * namedAvatar API
 * @module namedAvatar
 */

var AvatarImage = require('./image')
var AvatarName = require('./name')

function namedAvatar() {}

/**
 * global config
 */
namedAvatar.options = {
  // pick type, eg. firstNmae, lastName, initials
  nameType: 'firstName',

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

/**
 * set global config
 * @param {Object} options - extended global options
 */
namedAvatar.config = function(options) {
  Object.assign(this.options, options)
}

/**
 * set named avatar of imgs
 * @param {HTMLImageElement[]} imgs - <img> node list
 * @param {string} attr - attribute name, eg. alt, data-name
 */
namedAvatar.setImgs = function(imgs, attr) {
  for (var i = 0; i < imgs.length; i++) {
    this.setImg(imgs[i], imgs[i].getAttribute(attr))
  }
}

/**
 * set named avatar of img
 * @param {HTMLImageElement} img - <img> node
 * @param {string} fullName - full name
 */
namedAvatar.setImg = function(img, fullName) {
  var options = {}
  if (!('width' in this.options) && img.width) {
    options.width = img.width
  }

  var svg = this.getSVG(fullName, options)

  var uri = 'data:image/svg+xml,' + svg.outerHTML
  img.setAttribute('src', uri)
}

/**
 * get avatar svg node
 * @param {string} fullName - full name
 * @param {Object} extendOptions - local extended options
 * @return {HTMLElement} - <svg> node
 */
namedAvatar.getSVG = function(fullName, extendOptions) {
  var options = Object.assign({}, this.options, extendOptions)

  var avatarName = new AvatarName(fullName, options)
  var name = avatarName.getName()

  var avatarImage = new AvatarImage(name, options)
  return avatarImage.createSVG()
}

module.exports = namedAvatar

},{"./image":1,"./name":3}],3:[function(require,module,exports){
/**
 * namedAvatar name
 * @module AvatarName
*/

/**
 * pick name
 * @class
 * @param {string} fullName - full name
 * @param {Object} options - options
 */
function AvatarName(fullName, options) {
  this.fullName = fullName
  this.options = options
}

/**
 * pick display name from full name
 * @return {string} name - picked name
 */
AvatarName.prototype.getName = function() {
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

module.exports = AvatarName

},{}],4:[function(require,module,exports){
var namedAvatar = require('../index')

module.exports = function (el, binding) {
  // if image is load ok
  if (el instanceof HTMLImageElement) {
    if (el.naturalWidth && el.src.indexOf('data:') !== 0) {
      return
    }
  }

  namedAvatar.setImg(el, binding.value)
}

},{"../index":2}],5:[function(require,module,exports){
var namedAvatar = require('../index')
var directive = require('./directive')

module.exports = {
  install: function (Vue, options) {
    namedAvatar.config(options)
    Vue.namedAvatar = namedAvatar

    Vue.directive('directive', directive)
  },

  directive: directive,
}

},{"../index":2,"./directive":4}]},{},[5])(5)
});