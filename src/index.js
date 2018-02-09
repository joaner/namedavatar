import AvatarImage from './image'
import AvatarName from './name'

export default class NamedAvatar {
  static setImgs(imgs) {
    for (var i = 0; i < imgs.length; i++) {
      this.setImg(imgs[i], imgs[i].getAttribute('data-name'))
    }
  }

  static setImg(img, fullName) {
    const avatarName = new AvatarName(fullName)
    const name = avatarName.getName()

    const avatarImage = new AvatarImage(name)
    const svg = avatarImage.createSVG()

    const uri = 'data:image/svg+xml;utf8,' + svg.outerHTML
    img.setAttribute('src', uri)
  }
}
