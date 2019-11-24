const router = require('koa-router')();
const User = require('./../dbs/models/user')

router.prefix('/user');

router.post('/add', async (ctx, next) => {
    console.log('/user/add')
    console.log(ctx.request.body);
    const user = new User({
        name: ctx.request.body.name,
        age: ctx.request.body.age
    })
    let code
    try {
        await user.save()
        code = 200
    } catch {
        code = 101
    }
    ctx.body = {
        code: code
    }
});
router.post('/update', async (ctx, next) => {
    const result = await User.where({
        _id: ctx.request.body._id
    }).update({
        name: ctx.request.body.name,
        age: ctx.request.body.age
    })
    ctx.body = {
        code: 200
    }
});
router.get('/find', async (ctx, next) => {
    const result = await User.find()
    ctx.body = {
        code: 200,
        result
    }
});
router.post('/delete', async (ctx, next) => {
    const result = await User.where({
        _id: ctx.request.body._id
    }).remove()
    ctx.body = {
        code: 200
    }
});

module.exports = router;


  