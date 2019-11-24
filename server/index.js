const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const consola = require('consola')
const {
  Nuxt,
  Builder
} = require('nuxt')

const app = new Koa()

const mongoose = require('mongoose')
const dbConfig = require('./dbs/config')

const city = require('./routes/city')
const user = require('./routes/user')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
      port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }))
  app.use(city.routes(), city.allowedMethods())
  app.use(user.routes(), user.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  // 连接数据库
  mongoose.connect(dbConfig.dbs, {
    useNewUrlParser: true
  });
  // 连接失败
  mongoose.connection.on("error", function (err) {
    console.error("数据库链接失败:" + err);
  });
  // 连接成功
  mongoose.connection.on("open", function () {
    console.log("数据库链接成功");
  });
  // 断开数据库
  mongoose.connection.on("disconnected", function () {
    console.log("数据库断开");
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
