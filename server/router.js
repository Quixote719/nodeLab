const Router = require('koa-router');
const router = new Router();

router.all('/websocket/:id', async ctx => {
  let t = setInterval(function() {
    let n = Math.random()
    if(n > 0.3) {
      let msg = JSON.stringify({ 'id': ctx.params.id, 'n': n })
      ctx.websocket.send(msg)
    }
  }, 1000)
  ctx.websocket.on('message', msg => {
    let message =  msg.toString('utf8')
    console.log('前端发过来的数据：', message)
  })
  ctx.websocket.on('close', () => {
    console.log('前端关闭了websocket')
  })
})

module.exports = router;
