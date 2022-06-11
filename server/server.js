const Koa = require('koa')
const websockify = require('koa-websocket')
const koaConnect = require('koa2-connect')
const bodyParser = require('koa-bodyparser')
const {createProxyMiddleware } = require('http-proxy-middleware')
const router = require('./router')
const app = new Koa()
const port = 3002
 
const kws = websockify(new Koa()) 

kws.ws.use((ctx, next) => {
    return next(ctx)
  })
  
kws.ws.use(router.routes()).use(router.allowedMethods())
kws.listen(3003, ()=>{console.log('port listen in 3003')})
