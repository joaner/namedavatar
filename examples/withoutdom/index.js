const namedavatar = require('../../dist/namedavatar.js')

// create svg html string without DOM
const svg = namedavatar.getSVGString('李连杰')
const uri = namedavatar.getDataURI(svg)

console.log(uri)