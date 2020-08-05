/**
 * namedavatar image
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
  this.options = options || {}
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
    text.setAttribute('font-size', this.getFontSize() + 'px')
    text.setAttribute('font-family', this.getFontFamily())

    // IE/Edge don't support alignment-baseline
    // @see https://msdn.microsoft.com/en-us/library/gg558060(v=vs.85).aspx
    if (document.documentMode || /Edge/.test(navigator.userAgent)) {
      text.setAttribute('dy', '0.35em')
    } else {
      text.setAttribute('alignment-baseline', 'middle')
    }

    text.textContent = this.name

    svg.appendChild(text)
  }

  return svg
}

/**
 * Create SVG string without DOM (for miniprogram)
 * @param {string} name - picked name
 * @param {Object} options - options
 * @return {string} - svg string
 */
AvatarImage.prototype.createSVGString = function() {
  const escapeHTML = function(text) {
    return text.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  const buildAttrs = function(attributes) {
    let text = ''
    for (const name in attributes) {
      if (attributes.hasOwnProperty(name)) {
        const value = typeof attributes[name] === 'string'
          ? escapeHTML(attributes[name])
          : ''
        text += ` ${name}="${value}"`
      }
    }
    return text
  }

  const svgAttributes = {
    'xmlns': 'http://www.w3.org/2000/svg',
  }
  if ('width' in this.options) {
    var width = this.options.width
    var height = 'height' in this.options ? this.options.height : width

    svgAttributes['width'] = width
    svgAttributes['height'] = height
  }

  const rectAttributes = {
    'fill': this.getBackgroundColor(),
    'x': 0,
    'y': 0,
    'width': '100%',
    'height': '100%',
  }
  const rect = `<rect${buildAttrs(rectAttributes)}></rect>`

  let text
  if (typeof this.name === 'string' && this.name.length > 0) {
    const textAttributes = {
      'fill': this.getTextColor(),
      'x': '50%',
      'y': '50%',
      'text-anchor': 'middle',
      'font-size': this.getFontSize() + 'px',
      'font-family': this.getFontFamily(),

      // NOTE: IE/Edge don't support alignment-baseline
      // @see https://msdn.microsoft.com/en-us/library/gg558060(v=vs.85).aspx
      'alignment-baseline': 'middle',
    }

    text = `<text${buildAttrs(textAttributes)}>${escapeHTML(this.name)}</text>`
  }
  return `<svg${buildAttrs(svgAttributes)}>${rect}${text}</svg>`
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
 * get text font family
 * @return {string} - font family
 */
AvatarImage.prototype.getFontFamily = function() {
  return this.options.fontFamily
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
