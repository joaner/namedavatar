var AvatarImage = require('./image')
var AvatarName = require('./name')

NamedAvatar.prototype.setImgs = function(imgs) {
  for (var i = 0; i < imgs.length; i++) {
    this.setImg(imgs[i], imgs[i].getAttribute('data-name'))
  }
}
NamedAvatar.prototype.setImg = function(img, fullName) {
  var avatarName = new AvatarName(fullName)
  var name = avatarName.getName()

  var avatarImage = new AvatarImage(name)
  var svg = avatarImage.createSVG()

  var uri = 'data:image/svg+xml;utf8,' + svg.outerHTML
  img.setAttribute('src', uri)
}

module.exports = NamedAvatar
