const https = require('https')

https.get('https://tenapi.cn/tel/?tel=15924139731', res => {
    // console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    // res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
}).on('error', err => {
    console.log('Error: ', err.message);
});

let post_data = {
};//这是需要提交的数据
let content = JSON.stringify(post_data);
let options = {
  hostname: 'api.paugram.com',
  port: 443, 
  path: '/acgm/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};
let req = https.request(options, function (res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  //JSON.parse(chunk)
  });
});
req.on('error', function (e) {
  console.log('problem with request: ' + e.message);
});
// write data to request body
req.write(content);
req.end();
