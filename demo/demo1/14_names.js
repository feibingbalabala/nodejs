const {basename, dirname, extname} = require('path')

const filePath = '/user/local/text.txt'

console.log("basename:", basename(filePath)) // 文件名text.txt
console.log("dirname", dirname(filePath)) // 文件目录/user/local
console.log("extname", extname(filePath)) // 文件拓展名.txt