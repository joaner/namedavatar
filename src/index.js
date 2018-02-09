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
