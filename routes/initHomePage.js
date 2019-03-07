const Router = require('koa-router');
const router = new Router();

const dataBase = "/init"

const { initHomePage } = require('../dao/initHomePageDao')

router.post(dataBase + '/initHomePage', async (ctx) => {
    ctx.body = await initHomePage(ctx.request.body)
})

module.exports = router