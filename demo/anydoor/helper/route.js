const fs = require('fs');
const path = require('path')
const {promisify} = require('util');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const handlebars = require('handlebars');
const config = require('../config/defaultConfig');
const mine = require('./mime');
const compress = require('./compress');
const range = require('./range');
const isFresh = require('./cache')
const tplPath = path.join(__dirname, '../template/dir.html');
const source = fs.readFileSync(tplPath);
const template = handlebars.compile(source.toString());

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      const contentType = mine(filePath);
      res.setHeader('Content-Type', contentType);
      if (isFresh(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return
      }
      let rs;
      const {code, starts, end} = range(stats.size, req, res);
      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath)
      } else {
        rs = fs.createReadStream(filePath, {starts, end})
      }
      if (filePath.match(config.compress)) {
        rs = compress(rs, req, res)
      }
      rs.pipe(res); // pipe()返回一点处理一点
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      const dir = path.relative(config.root, filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html');
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files: files.map(file => {
          return {
            file,
            icon: mine(file)
          }
        })
      }
      res.end(template(data))
    }
  } catch (ex) {
    console.log(ex)
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${filePath} not find \n ${ex}`);
  }
}