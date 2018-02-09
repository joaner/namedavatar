var namedAvatar = require('../index')

module.exports = function (el, binding) {
  // if image is load ok
  if (el instanceof HTMLImageElement) {
    if (el.naturalWidth) {
      return
    }
  }

  namedAvatar.setImg(el, binding.value)
}
