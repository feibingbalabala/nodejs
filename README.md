# nodejs

## nodejs是什么

### Node.js is a JavaScript runtime built on Chrome's V8.

类似java的jre，在chrome's V8运行环境的runtime，语言在不同的运行环境上面跑就需要对应的runtime。

不能使用js的DOM和BOM，这是DOM结构和浏览器的属性，算是一个符合ECMA标准的web开发。

### Node.js uses an event-driven，non-blocking I/O model.

#### 非阻塞IO

I/O：input/output

阻塞：I/O时进程休眠等待I/O完成后进行下一步

非阻塞：I/O时函数立即返回，进程不等待I/O完成（I/O操作程序进程继续，等到I/O结束后通知程序相关操作）

I/O操作时间很慢

#### 事件驱动

I/O等异步操作结束后的通知

观察这模式

## 适合场景

适合处理高并发、I/O密集场景性能优势明显

CPU密集：压缩、解压、加密、解密

I/O密集：文件操作、网络操作、数据库

### web常见场景

1. 静态资源读取
2. 数据库操作
3. 渲染页面

### 高并发处理

1. 增加机器数（负载均衡）
2. 增加每台机器的CPU数-多核

### 进程

计算机中的程序关于某数据集合上的一次运行活动，是系统进行资源分配和调度的基本单位。（正在进行中的程序）

多进程：启用多个进程，多个进程可以一块执行多个任务。

## nodeJs工作模型

## 线程

进程中一个相对独立，可调度的执行单元，与同属一个进程的线程共享进程的资源。

多线程：启动一个进程，在一个进程内启动多个线程，这样多个线程也可以一块执行多个任务

### nodejs单线程

单线程只针对主进程，I/O操作系统底层多线程调度

单线程不是单进程

## 常见场景

1. web server
2. 本地代码构建
3. 使用工具开发

## 初探

```js
(function (exports, require, module, __filename, __dirname) {
  // nodejs在执行的时候在外包裹了函数
  ...
})
```

exports(object)：模块的输出（对外提供接口、属性）

require(function)：需要依赖别的模块的时候所调用的function

module(object)：模块本身

__filename：文件的直接路径（绝对地址）

__dirname：文件所在的文件夹路径（绝对地址）

### commonJS模块规范

1. 每个文件是一个模块，有自己的作用域(匿名函数)
2. 在模块内部module变量代表模块本身
3. module.exports属性代表模块对外接口

### require规则

1. /绝对路径，./表示相对于当前文件的路径
2. 支持js、json、node拓展名，不写依次尝试
3. 不写路径则认为是build-in模块或者各级node_modules内的第三方模块

### require特性

1. 只加载一次，加载后缓存(demo1/04cache.js)
2. 一旦一个模块被循环加载，就值输出已经执行的部分，还未执行的部分不会加载(demo1/05_main.js)

### 引用系统内置模块和第三方模块

系统模块(demo1/06_fs.js)

```js
const fs = require('fs');

const result = fs.readFile('./06_fs.js', (err, data) => {
  if (err) {
    console.log(err) // 报错信息，找不到文件
  } else {
    console.log(data.toString()) // 不加toString()会得到一堆二进制的文件
  }
});

console.log(result) // undefined，读取文件是异步的，这时候还没读取
```

第三方模块

首先npm下载依赖查找本模块，找不到就去node_modules文件找

```js
const chalk = require('chalk')

console.log(chalk.red('red'))
```

npm root -g 可以知道本电脑所有的全局依赖

### model.exports和exports的区别

exports默认是model.exports，但修改了exports，他就不在默认了

### global全局变量

CommonJS

buffer：表示二级制数据处理

process：和进程相关挂载在global

```js
const {argv, argv0, execArgv, execPath, env} = process;
// argv启动的参数 例如 node 08_process.js a
// 输出node所在的文件目录，08_process.js的文件目录，a
argv.forEach(item => {
  console.log(item)
});

console.log(argv0) // 输出第一个node所在的文件目录

console.log(execArgv) // 输出在文件名前面的参数

console.log(execPath) // 调用的程序路径

console.log(env) // 当前系统的执行环境

console.log(process.cwd()) // 一个函数，输出当前命令执行所在的文件
```

console: 打印

timer: 计时器

```js
// 一样有setTimeOut(),setInterval()
setImmediate(() => {

})
// 和时间无关 等下一个事件队列，同步任务执行后执行他

process.nextTick(() => {
  // 会比setImmediate执行早，setTimeOut在他们之间
  // nextTick放在当前事件队列最后，setImmediate下一个事件队列之前
  // nextTick出现循环调用会导致后面的异步无法执行，选择需要慎重
})
```

```js
// 暴露到全局
global.prop = 100
```

### debug调试

在node命令和文件中间输入 --inspect-brk

例如 node --inspect-brk 10_debug.js

在chrome浏览器中输入chrome://inspect，点击target

## node的API

normalize：把不规范的路径处理规范。(demo1/11_normalize.js)

```js
const {normalize} = require('path')

console.log(normalize('/user///local'))
```

join：把传入的路径拼接起来，本身也会调用normalize。(demo1/12_join.js)

```js
const {join} = require('path')

console.log(join('/user', 'local', 'path1'))
```

resolve：把相对路径变成绝对路径。(demo2/13_resolve.js)

```js
const {resolve} = require('path');

console.log(resolve('./'))
```

basename、dirname、extname

```js
const {basename, dirname, extname} = require('path')

const filePath = '/user/local/text.txt'

console.log("basename:", basename(filePath)) // 文件名text.txt
console.log("dirname", dirname(filePath)) // 文件目录/user/local
console.log("extname", extname(filePath)) // 文件拓展名.txt
```

parse、format

```js
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
```

## path

__dirname、__filename总是返回文件的绝对路径

process.cwd()总是返回执行Node命令所在文件夹

## Buffer

buffer用于处理二进制数据流

实例类似整数数组、大小固定

c++代码在v8堆外分配物理内存

```js
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
```

## events事件

```js
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
```

## fs（文件系统）

```js
const fs = require('fs')
// 读取文件
  // 异步
  fs.readFile('./19_fs.js', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('异步', data)
  })
  // 同步
  const data = fs.readFileSync('./19_fs.js')
  console.log('同步', data)
// 写入文件
fs.writeFile('./text', 'hello', {
  encoding: 'utf8'
}, err => {
  if (err) throw err;
  console.log('done')
})
// 文件信息(可用于判断文件是否存在)
fs.stat('./19_fs.js', (err, stats) => {
  if (err) throw err;
  console.log(stats.isFile());
  console.log(stats.isDirectory());
  console.log(stats)
})
// 修改文件名
fs.rename('./text', 'text.txt', err => {
  if (err) throw err;
  console.log('done');
})
// 删除文件
fs.unlink('./text.txt', err => {
  if (err) {
    console.log(err)
  }
  console.log('done')
})
// 读取文件夹
fs.readdir('./', (err, files) => {
  if (err) throw err;
  console.log(files)
})
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
```

(demo1/19_fs.js)

### stream（流）

```js
const fs = require('fs');

const rs = fs.createReadStream('./20_stream.js')

rs.pipe(process.stdout) // 从上往下读取

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
```

(demo1/20_stream.js)

### 解决回调地狱

解决A函数中执行B函数回调，B函数中执行C的回调

```js
const fs = require('fs')

const { promisify } = require('util')

const read = promisify(fs.readFile);

// 方法1 promisify

read('./21_promisify.js').then(data => {
  console.log(data.toString())
}).catch(ex => {
  console.log(ex)
})

// async await

async function test () {
  try {
    const content = await read('./21_promisify.js')
    console.log(content.toString())
  } catch (ex) {
    console.log(ex)
  }
}

test()
```

(demo1/21_promisify.js)

## 实现一个静态资源服务器跟目录（anywhere）

### 压缩

在Headers中RequestHeaders的Accept-Encoding: gzip, deflate是浏览器发给服务器的信息，告诉服务器浏览器支持什么压缩格式。Response Header中content-encoding: 代表服务器发给浏览器的压缩格式。

(myanydoor/src/helper/compress)

### range范围请求

range: bytes=[start]-[end]

Accept-Ranges: bytes

Content-Range: bytes start-end/total

(myanydoor/src/helper/range)

### 缓存

Expires(绝对时间), Cache-Control(相对时间): 来判断是否失效的时间

If-Modified-Since / Last-Modified: 服务器每次反问告诉你上次修改的时间

If-None-Match / ETag: 生成一个hash值

(myanydoor/src/helper/cache)

## 测试

### assert-断言

一个简单的测试用例

```js
  // math.js
  module.exports = {
    add: ( ...args ) => {
        return args.reduce((prev, curr) => {
            return prev + curr;
        })
    },

    mul: ( ...args ) => {
        return args.reduce((prev, curr) => {
            return prev * curr;
        });
    }
  }
```

```js
  // simple.js
  const assert = require('assert');
  const { add, mul } = require('../src/math');

  if (add(2, 3) === 5) {
    console.log('add(2, 3) === 5，ok');
  } else {
    console.log('add(2, 3) !== 5，error');
  }
```

使用chai，mocha

```js
  npm install chai
  npm install mocha

  // 在pagejson.js的scripts里面使用命令行
  // "test": "mocha ./mocha.js"
  // mocha.js
  const assert = require('assert');
  const { add, mul } = require('../src/math');

  describe('#math', () => {
    describe('add', () => {
        it ('should return 5 when 2 + 3', () => {
            assert.equal(add(2, 3), 5);
        });

        it ('should return -1 when 2 + -3', () => {
            assert.equal(add(2, -3), -1);
        });
    });

    describe('mul', () => {
        it ('should return 6 when 2 * 3', () => {
            assert.equal(mul(2, 3), 6);
        });
    });
  });
```

测试覆盖率

利用istanbul测试测试用例的执行顺序和执行覆盖率

```js
npm install istanbul

// math.js
function min (a, b) {
    return b * a;
}

module.exports = {
    add: ( ...args ) => {
        return args.reduce((prev, curr) => {
            return prev + curr;
        });
    },

    mul: ( ...args ) => {
        return args.reduce((prev, curr) => {
            return prev * curr;
        });
    },

    cover: (a, b) => {
        if (a > b) {
            return a - b;
        } else if (a === b) {
            return a + b;
        } else {
            return min(a, b)
        }
    }
}

// mocha.js

const assert = require('assert');
const { add, mul, cover } = require('../src/math');

describe('#math', () => {
    describe('add', () => {
        it ('should return 5 when 2 + 3', () => {
            assert.equal(add(2, 3), 5);
        });

        it ('should return -1 when 2 + -3', () => {
            assert.equal(add(2, -3), -1);
        });
    });

    describe('mul', () => {
        it ('should return 6 when 2 * 3', () => {
            assert.equal(mul(2, 3), 6);
        });
    });

    describe('cover', () => {
        it ('should return 6 when cover(2, 3)', () => {
            assert.equal(cover(2, 3), 6);
        });

        it ('should return 1 when cover(3, 2)', () => {
            assert.equal(cover(3, 2), 1);
        });

        it ('should return 1 when cover(2, 2)', () => {
            assert.equal(cover(2, 2), 4);
        });
    });
});
```

持续集成

1、频繁地将代码集成到主干。

2、每次集成都通过自动化构建来验证。

优点：今早发现错误，防止分支大幅偏离主干

性能

使用benchmark做性能测试，ops/sec每秒操作次数，误差率，越大越好。

```js
npm install benchmark

const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

suite.add('RefExp#test', function() {
    /o/.test('Hellow World!');
})
.add('String#indexOf', function() {
    'Hello World!'.indexOf('o') > -1;
})
.add('String#match', function() {
    !!'Hello World'.match(/o/);
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
})
.run({'async': true})
```

## 爬虫

按照一定的规则自动抓取网络信息的程序

### 反爬虫

1、User-Agent、Referer，验证码。

2、单位时间访问次数、访问量。

3、关键信息图片混淆。

4、异步加载。

### puppeteer

```js
const puppeteer = require('puppeteer');
const { screenshot } = require('./config/defult');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    await page.screenshot({
        path: `${screenshot}/${Date.now()}.png`
    });
    await browser.close();
})()
```

puppeteer安装失败

安装puppeteer时因为需要下载chrom的缘故总是安装失败提示，执行npm install puppeteer --ignore-scripts 跳过安装chromuin步骤

```js
const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({
        executablePath: './Chromium'
    });
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    await page.screenshot({
      path: `${screenshot}/${Date.now()}.png`
    });
    browser.close();
})();
```

## 搭建一个基于express框架的运行环境

1、安装express

2、通过生成器自动生成目录

3、配置分析

### 安装

安装一个express-generator生成器

```js
  npm install -g express-generator
```

### 新建一个项目

```js
express server
```

### 启动

```js
node bing/www
```

```js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');

var indexRouter = require('./routes/index'); // 加载路由模块
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views')); // 使用什么view模版
// app.set('view engine', 'jade'); // view模版使用什么引擎

// 使用html
app.set('views', path.join(__dirname, 'views/html'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev')); // 使用第三方插件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // 静态资源路径

app.use('/', indexRouter); // 通过不同地址，访问不同的模块
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) { // 全局404拦截，next是不是什么都拿不到，拿不到404
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) { // 全局错误拦截
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

```

具体在/demo/express_demo/server/app.js

tip: 修改内容有点麻烦要重启

如果需要使用html模版需要安装ejs

## MongoDB

高可拓展性

分布式存储

低成本

结构灵活

### 安装MongoDB

1、下载安装包或者压缩包

2、添加db存储和日志存储文件夹

3、添加服务、配置环境变量、启用Mongo

### 配置MongoDB

a.在c:\MongoDB（可随意起）下面建一个data文件夹 c:\MongoDB\data

b.在c:\MongoDB（可随意起）下面建一个logs文件夹 c:\MongoDB\logs ，在里面建一个文件mongo.log

c.在c:\MongoDB（可随意起）下面建一个etc(随意起，放配置文件)文件夹 c:\MongoDB\etc ,在里面建一个文件mongo.conf

d.打开mongo.conf文件，修改如下：

数据库路径

```code
  dbpath=c:\MongoDB\data\
```

日志输出文件路径

```code
  logpath=c:\MongoDB\logs\mongodb.log
```

错误日志采用追加模式，配置这个选项后mongodb的日志会追加到现有的日志文件，而不是从新创建一个新文件

```code
  logappend=true
```

启用日志文件，默认启用

```code
  journal=true
```

这个选项可以过滤掉一些无用的日志信息，若需要调试使用请设置为false

```code
  quiet=false
```

端口号 默认为27017

```code
  port=27017
```

指定存储引擎（默认先不加此引擎，如果报错了，大家在加进去）

```code
  storageEngine=mmapv1
```

http://www.imooc.com/article/18438