console.log(Buffer.alloc(10)) // <Buffer 00 00 00 00 00 00 00 00 00 00>
console.log(Buffer.alloc(20)) // <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>
console.log(Buffer.alloc(5, 1)) // <Buffer 01 01 01 01 01>
console.log(Buffer.allocUnsafe(10)) // <Buffer 19 b7 58 98 bc 03 00 00 00 00>

console.log(Buffer.from([1, 2, 3])) // <Buffer 01 02 03>
console.log(Buffer.from('text')) // <Buffer 74 65 78 74> 默认utf8
console.log(Buffer.from('text', 'base64')) // <Buffer b5 ec 6d>

console.log(Buffer.byteLength('text')) // 4
console.log(Buffer.byteLength('文字')) // 6
// 判断是否二进制
console.log(Buffer.isBuffer({})); // false
console.log(Buffer.isBuffer(Buffer.from([1, 2, 3]))) // true
// 拼接buffer
const buf1 = Buffer.from('jiang')
const buf2 = Buffer.from('wen')
const buf3 = Buffer.from('yong')
const name = Buffer.concat([buf1, buf2, buf3])
console.log(name.toString()) // jiangwenyong
// buffer的长度，和申请空间有关
const buf = Buffer.from('jiangwenyong')
console.log(buf.length); // 12
// 字符串转换
console.log(buf.toString('base64'))
// 填充
const bufFill = Buffer.allocUnsafe(10);
console.log(bufFill) // <Buffer 60 13 bf f4 16 02 00 00 07 00>
console.log(bufFill.fill(10, 1, 9)) // Buffer 60 0a 0a 0a 0a 0a 0a 0a 0a 00>
// 比较buffer大小
const bufEq1 = Buffer.from('a');
const bufEq2 = Buffer.from('a');
const bufEq3 = Buffer.from('b');
console.log(bufEq1.equals(bufEq2)) // true
console.log(bufEq1.equals(bufEq3)) // false
// indexOf
const bufIdx = Buffer.from('abcd');
console.log(bufIdx.indexOf('bc')) // 1
console.log(bufIdx.indexOf('bca')) // -1
// copy方法，解决中文乱码
const { StringDecoder } = require('string_decoder')
const decoder = new StringDecoder('utf8')
const bufCopy = Buffer.from('中文乱码！');
for (let i = 0; i < bufCopy.length; i += 4) {
  const b = Buffer.allocUnsafe(4);
  bufCopy.copy(b, 0, i);
  console.log(b.toString())
}
for (let i = 0; i < bufCopy.length; i += 4) {
  const b = Buffer.allocUnsafe(4);
  bufCopy.copy(b, 0, i);
  console.log(decoder.write(b))
}