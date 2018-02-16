var namedavatar = require('../index')
var directive = require('./directive')

/**
 * Vue Plugin
 * @example
 * var namedavatarVue = require('namedavatar/vue')
 * Vue.use(namedavatarVue)
 */
module.exports = {
  install: function (Vue, options) {
    namedavatar.config(options)
    Vue.namedavatar = namedavatar

    // support v-avatar="username"
    Vue.directive('avatar', directive)
  },

  directive: directive,
}
