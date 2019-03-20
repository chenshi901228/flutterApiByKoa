const Router = require('koa-router');
const router = new Router();

const dataBase = "/init"

const { initHomePage, getLastTime } = require('../dao/initHomePageDao')

router.post(dataBase + '/initHomePage', async (ctx) => {
    ctx.body = await initHomePage(ctx.request.body)
})
router.post(dataBase + "/lastTime", async (ctx) => {
    ctx.body = await getLastTime(ctx.request.body)
})
module.exports = router