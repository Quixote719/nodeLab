const Router = require('koa-router');
const router = new Router({prefix: '/myth'});

router.get('/zeus', (ctx, next) => {
  console.log('zeus', ctx)
  ctx.response.body = "zeus";
});

router.post('/apollo', (ctx, next) => {
  console.log('apollo', ctx.request.body)
  ctx.response.body = "apollo";
});

module.exports = router;
