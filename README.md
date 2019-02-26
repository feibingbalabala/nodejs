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

1. 只加载一次，加载后缓存
2. 一旦一个模块被循环加载，就值输出已经执行的部分，还未执行的部分不会加载