const people = require('./people');

console.log(people.name);

console.log(people.say('like you'))

let http = require('http');
let url = require('url');
let util = require('util');

// 注意http.createServer返回一个对象，对象才有对应的listen方法
let server = http.createServer((req, res) => {
    res.statusCode = 200;

    res.setHeader('Content-Type', 'text/plain; charset-utf-8');

    // res.end('Hello, jiangwy');
    // 浏览器输出Hello, jiangwy
    // util.inspect把对象用字符串输出
    res.end(util.inspect(url.parse(req.url)));
    // 访问地址：
    // http://127.0.0.1:3000
    // 浏览器输出：
    // Url {
    // protocol: null,
    // slashes: null,
    // auth: null,
    // host: null,
    // port: null,
    // hostname: null,
    // hash: null,
    // search: null,
    // query: null,
    // pathname: '/',
    // path: '/',
    // href: '/' }

    // 访问地址：
    // http://127.0.0.1:3000/index.html?a=123#/demo
    // 浏览器输出
    // Url {
    // protocol: null,
    // slashes: null,
    // auth: null,
    // host: null,
    // port: null,
    // hostname: null,
    // hash: null,
    // search: '?a=123',
    // query: 'a=123',
    // pathname: '/index.html',
    // path: '/index.html?a=123',
    // href: '/index.html?a=123' }

    // 无法获取hash路由的参数，如果需要获取会需要req.originalUrl
});

server.listen(3000, '127.0.0.1', () => {
    console.log('服务器已经运行，请输入：http://127.0.0.1:3000/')
})