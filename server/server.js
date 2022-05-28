const Koa = require('koa')
const koaConnect = require('koa2-connect')
const bodyParser = require('koa-bodyparser')
const {createProxyMiddleware } = require('http-proxy-middleware')
const router = require('./router')
const app = new Koa()
const port = 3002
 

// app.use(
// 	koaConnect(
//     // 代理全部以 /api 开头的 HTTPS 请求
// 		createProxyMiddleware('/', {
// 			target: 'https://tenapi.cn/tel/?tel=15924139731', // 目标服务器地址
// 			changeOrigin: true	// 允许跨域
// 		})
// 	)
// );
 
app.use(bodyParser())
app.use(router.routes());
app.use(router.allowedMethods());

// app.use(async (ctx)=>{
//     // 获取请求地址
//     const url = ctx.url; // 端口号后面的部分
//     // 获取请求方法
//     const method = ctx.method; // 'GET'
//     // 获取请求对象
//     const request = ctx.request;
//     // 从request中获取get请求参数
//     const query = request.query; // 已经转换为对象
//     const querystring = request.querystring; // ?后面的字符串内容
//     // 从ctx中获取get请求参数(和在request获取是一样的)
//     const query2 = ctx.query; 
//     const querystring2 = ctx.querystring;
//     ctx.response.body = {guard: 'Jeriko'};
//     console.log('url', ctx, ctx.url)
//   })

app.listen(port)

console.log('server started at port ' + port)