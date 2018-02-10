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
