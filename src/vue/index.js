var namedavatar = require('../index')
var directive = require('./directive')

module.exports = {
  install: function (Vue, options) {
    namedavatar.config(options)
    Vue.namedavatar = namedavatar

    Vue.directive('directive', directive)
  },

  directive: directive,
}
