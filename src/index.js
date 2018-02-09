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
