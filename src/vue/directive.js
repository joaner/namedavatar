var namedavatar = require('../index')

module.exports = function (el, binding) {
  // if image is load ok
  if (el instanceof HTMLImageElement) {
    if (el.naturalWidth && el.src.indexOf('data:') !== 0) {
      return
    }
  }

  namedavatar.setImg(el, binding.value)
}
