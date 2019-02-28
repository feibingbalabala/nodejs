const EventEmitter = require('events')
// 触发一个事件
class CustomEvent extends EventEmitter {}
const ce = new CustomEvent();
ce.on('test', ()=> {
  console.log('test')
})
// setInterval(() => {
//   ce.emit('test')
// }, 500);
// 传递参数
class CustomError extends EventEmitter {}
const cb = new CustomError();
cb.on('error', (err, timer) => {
  console.log(err)
  console.log(timer)
})
// cb.emit('error', new Error('oops!'), Date.now());
// once
class CustomOnce extends EventEmitter {}
const cc = new CustomOnce();
cc.once('once', () => {
  console.log('once')
})
// setInterval(() => {
//   cc.emit('once')
// }, 500);
// remove
class CustomRemove extends EventEmitter {}
function fn1 () {
  console.log('fn1')
}
function fn2 () {
  console.log('fn2')
}
const cd = new CustomRemove()
cd.on('remove', fn1);
cd.on('remove', fn2);
setInterval(() => {
  cd.emit('remove')
}, 500);
setTimeout(() => {
  // cd.removeListener('remove', fn1)
  // cd.removeListener('remove', fn2)
  // 移除全部
  cd.removeAllListeners('remove')
}, 1500);