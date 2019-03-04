module.exports = {
  root: process.cwd(),
  hostname: '127.0.0.1',
  port: 8080,
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 10000,
    expires: false,
    cacheControl: false,
    lastModified: false,
    etag: false
  }
}