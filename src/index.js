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
