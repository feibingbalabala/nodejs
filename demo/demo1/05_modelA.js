module.exports.step = 'A'

const modB = require('./05_modelB')

console.log('modA:', modB.step)

module.exports.step = 'A2'