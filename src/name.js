class Name {
  constructor(fullName, options) {
    this.fullName = fullName
    this.options = options
  }

  getName() {
    const fullName = this.fullName
    if (!fullName) {
      return
    }

    const firstCharCode = fullName.charCodeAt()
    if (firstCharCode > 256) {
      return fullName.slice(1)
    }
    const names = fullName.split(' ')

    // if only a name
    if (names.length === 1) {
      // if too much long
      if (names[0].length > 6) {
        // show first code
        return names[0].charAt(0).toUpperCase()
      }

      return names[0]
    }

    const lastName = names[names.length - 1]
    return lastName
  }
}

module.exports = Name
