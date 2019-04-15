/**
 * namedavatar API
 * @module namedavatar
 */

var AvatarImage = require('./image')
var AvatarName = require('./name')

/**
 * simple polyfill Object.assign for IE <= 11
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * @param {Object} target - target options
 * @param {Object} options - new options
 */
function extendOptions(target, options) {
  if (typeof Object.assign === 'function') {
    Object.assign(target, options)
  } else {
    // for IE < 11
    for (var key in options) {
      target[key] = options[key]
    }
  }
}

function namedavatar() {}

/**
 * global config
 */
namedavatar.options = {
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
namedavatar.config = function(options) {
  if (options && typeof options === 'object') {
    extendOptions(this.options, options)
  }
}

/**
 * set named avatar of imgs
 * @param {HTMLImageElement[]} imgs - <img> node list
 * @param {string} attr - attribute name, eg. alt, data-name
 */
namedavatar.setImgs = function(imgs, attr) {
  for (var i = 0; i < imgs.length; i++) {
    this.setImg(imgs[i], imgs[i].getAttribute(attr))
  }
}

/**
 * set named avatar of img
 * @param {HTMLImageElement} img - <img> node
 * @param {string} fullName - full name
 */
namedavatar.setImg = function(img, fullName) {
  var options = {}
  if (!('width' in this.options) && img.width) {
    options.width = img.width
  }

  var svg = this.getSVG(fullName, options)
  var body = svg.outerHTML
  var uri = 'data:image/svg+xml'

  if (typeof btoa === 'function') {
    uri += ';base64,' + btoa(unescape(encodeURIComponent(body)))
  } else {
    uri += ',' + encodeURIComponent(body)
  }
  img.setAttribute('src', uri)
}

/**
 * get avatar svg node
 * @param {string} fullName - full name
 * @param {Object} tempOptions - local extended options
 * @return {HTMLElement} - <svg> node
 */
namedavatar.getSVG = function(fullName, tempOptions) {
  var options = {}
  extendOptions(options, this.options)
  extendOptions(options, tempOptions)

  var avatarName = new AvatarName(fullName, options)
  var name = avatarName.getName()

  var avatarImage = new AvatarImage(name, options)
  return avatarImage.createSVG()
}

module.exports = namedavatar
