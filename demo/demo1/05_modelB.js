module.exports.step = 'B'

const modA = require('./05_modelA')

console.log('modB:', modA.step)

module.exports.step = 'B2'