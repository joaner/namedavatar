/**
 * namedavatar name
 * @module AvatarName
*/

/**
 * pick name
 * @class
 * @param {string} fullName - full name
 * @param {Object} options - options
 */
function AvatarName(fullName, options) {
  this.fullName = fullName
  this.options = options
}

/**
 * pick display name from full name
 * @return {string} name - picked name
 */
AvatarName.prototype.getName = function() {
  var fullName = this.fullName
  if (!fullName) {
    return
  }

  var name = fullName

  var isASCII = fullName.charCodeAt(0) < 256
  if (isASCII) {
    var names = fullName.split(' ')
    switch (this.options.nameType) {
      case 'firstName':
        name = names[0]
        break
      case 'lastName':
        name = names[names.length - 1]
        break
      case 'initials':
        name = ''
        for (var i = 0; i < names.length; i++) {
          name += names[i].charAt(0).toUpperCase()
        }
        break
    }

    if (name.length > 6) {
      name = name.charAt(0).toUpperCase()
    }
  } else if (fullName.length < 2) {
    name = fullName
  } else {
    switch (this.options.nameType) {
      case 'lastName':
      case 'initials':
        name = fullName.slice(0, 1)
        break
      case 'firstName':
      default:
        name = fullName.slice(1)
        break
    }
  }

  return name
}

module.exports = AvatarName
