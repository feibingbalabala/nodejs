const https = require('https');
// 注意http和https需要用不同的模块
https.get('https://www.300188.cn/', function (res) {
    // 他是一个持续的过程，不是一次返回的，每次返回一点数据然后拼接起来
    let data = '';
    res.on('data', function(chunk) {
        data = data + chunk;
    })
    res.on('end', function () {
        // 假如是一个json
        // let result = JSON.parse(data);
        // console(util.inspect(result))
        console.log(data)
    })
})