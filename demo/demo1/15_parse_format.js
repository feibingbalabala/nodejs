const {parse, format} = require('path');

const filePath = '/user/local/text.jpg'

const parseRes = parse(filePath)

console.log(parseRes)

// { root: '/',
//   dir: '/user/local',
//   base: 'text.jpg',
//   ext: '.jpg',
//   name: 'text' 
// }

const formatRes = format(parseRes)

console.log(formatRes) // /user/local\text.jpg