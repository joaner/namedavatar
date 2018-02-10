var namedAvatar = require('../index')
var directive = require('./directive')

module.exports = {
  install: function (Vue, options) {
    namedAvatar.config(options)
    Vue.namedAvatar = namedAvatar

    Vue.directive('directive', directive)
  },

  directive: directive,
}
