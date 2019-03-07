const Router = require('koa-router');
const router = new Router();

const dataBase = "/admin"

const { login, reg } = require('../dao/adminDao')

router.post(dataBase + '/login', async (ctx) => {
    ctx.body = await login(ctx.request.body)
})
router.post(dataBase + '/reg', async (ctx) => {
    ctx.body = await reg(ctx.request.body)
})
module.exports = router