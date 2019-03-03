const fs = require('fs');
const path = require('path')
const {promisify} = require('util');
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const handlebars = require('handlebars');
const config = require('../config/defaultConfig');
const tplPath = path.join(__dirname, '../template/dir.tpl');
const source = fs.readFileSync(tplPath)
const template = handlebars.compile(source.toString())

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    if (stats.isFile()) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      fs.createReadStream(filePath).pipe(res); //返回一点处理一点
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      const dir = path.relative(config.root, filePath)
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html');
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : '',
        files
      }
      res.end(template(data))
    }
  } catch (ex) {
    console.log(ex)
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`${filePath} not find`);
  }
}