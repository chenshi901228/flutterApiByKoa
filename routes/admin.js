const Router = require('koa-router');
const router = new Router();

const dataBase = "/admin"

const { login, reg, getList, edit, deleteOne } = require('../dao/adminDao')

router.post(dataBase + '/login', async (ctx) => {
    ctx.body = await login(ctx.request.body)
})
router.post(dataBase + '/reg', async (ctx) => {
    ctx.body = await reg(ctx.request.body)
})
router.post(dataBase + '/getList', async (ctx) => {
    ctx.body = await getList(ctx.request.body)
})
router.post(dataBase + '/edit', async (ctx) => {
    ctx.body = await edit(ctx.request.body)
})
router.post(dataBase + '/delete', async (ctx) => {
    ctx.body = await deleteOne(ctx.request.body)
})
module.exports = router