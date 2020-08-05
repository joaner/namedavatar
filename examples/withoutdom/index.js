#!env node

// for environments that do not support DOM (document.createElement), eg. 微信小程序
// use string concat to generate SVG html string

const namedavatar = require('../../dist/namedavatar.js')

// create svg html string without DOM
const svg = namedavatar.getSVGString('李连杰')

// convert svg html string to data uri
const uri = namedavatar.getDataURI(svg)

console.log(uri)