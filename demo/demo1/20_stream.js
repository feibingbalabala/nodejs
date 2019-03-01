const fs = require('fs');

const rs = fs.createReadStream('./20_stream.js')

// rs.pipe(process.stdout)

const ws = fs.createWriteStream('./text.txt');

const timer = setInterval(() => {
  const num = parseInt(Math.random() * 10);
  if (num < 8) {
    // 这里写入的必须是字符串
    ws.write(num.toString()) 
  } else {
    clearInterval(timer)
    ws.end();
  }
}, 200);

ws.on('finish', () => {
  console.log('done')
})