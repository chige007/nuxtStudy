const router = require('koa-router')();

router.prefix('/city');

router.get('/list', (ctx, next) => {
    ctx.body = {
        list: ['北京', '天津']
    }
});

module.exports = router;


  