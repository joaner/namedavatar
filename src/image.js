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
