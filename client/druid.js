const http = require('http')
const axios = require('axios');
const urlPrefix = 'http://localhost:3002/myth/'

http.get(urlPrefix + 'zeus', res => {
    // res.setEncoding('utf8');
    res.on('data', function (chunk) {
      console.log('BODY: ' + chunk);
    });
}).on('error', err => {
    console.log('Error: ', err.message);
});

let options = {
    host: "localhost",
    port: 3002, 
    path: '/myth',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    }
}

axios.post(urlPrefix + 'apollo', { description:'god of the sun' },{ headers: {
    'Content-Type': 'application/json',
}}).then(res => {
    // res.setEncoding('utf8');
    console.log(res.data)
}).catch(err => {
    console.log('Error: ', err.message);
});