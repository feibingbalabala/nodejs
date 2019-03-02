const http = require('http');
const chalk = require('chalk')
const conf = require('./config/defaultConfig');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.write('<div>')
  res.write('hello nodejs 123')
  res.end('</div>')
})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`;
  console.log(`server started at ${chalk.green(addr)}`);
})