const {sep, delimiter, win32, posix} = require('path')

console.log('sep:', sep) // /
console.log("posix sep:", posix.sep) // \

console.log('path：', process.env.PATH)

console.log('delimiter:', delimiter) // ;
console.log('posix delimiter:', posix.delimiter) // :