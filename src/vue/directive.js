var namedavatar = require('../index')

/**
 * Vue directive bind
 * @example
 * var namedavatarVueDirective = require('namedavatar/vue/directive')
 * Vue.directive('avatar', namedavatarVueDirective)'
 */
module.exports = function (el, binding) {
  // if image is load success
  if (el instanceof HTMLImageElement) {
    if (el.naturalWidth && el.src.indexOf('data:') !== 0) {
      return
    }
  }

  namedavatar.setImg(el, binding.value)
}
