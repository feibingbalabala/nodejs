const fs = require('fs')
// // 读取文件
//   // 异步
//   fs.readFile('./19_fs.js', 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log('异步', data)
//   })
//   // 同步
//   const data = fs.readFileSync('./19_fs.js')
//   console.log('同步', data)
// // 写入文件
// fs.writeFile('./text', 'hello', {
//   encoding: 'utf8'
// }, err => {
//   if (err) throw err;
//   console.log('done')
// })
// // 文件信息(可用于判断文件是否存在)
// fs.stat('./19_fs.js', (err, stats) => {
//   if (err) throw err;
//   console.log(stats.isFile());
//   console.log(stats.isDirectory());
//   console.log(stats)
// })
// // 修改文件名
// fs.rename('./text', 'text.txt', err => {
//   if (err) throw err;
//   console.log('done');
// })
// 删除文件
// fs.unlink('./text.txt', err => {
//   if (err) {
//     console.log(err)
//   }
//   console.log('done')
// })
// 读取文件夹
// fs.readdir('./', (err, files) => {
//   if (err) throw err;
//   console.log(files)
// })
// 创建文件夹
fs.mkdir('test', err => {})
// 删除文件夹
fs.rmdir('test', err => {})
// 检查文件发生变化
fs.watch('./', {
  recursive: true
}, (eventType, filename) => {
  console.log(eventType, filename)
})