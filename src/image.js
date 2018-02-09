'use strict'

function AvatarImage(name, options) {
  this.name = name
  this.options = options
}

AvatarImage.prototype.createSVG = function() {
  var svg = document.createElement('svg')

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
