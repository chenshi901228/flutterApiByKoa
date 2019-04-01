const Router = require('koa-router');
const router = new Router();

const baseUrl = "/admin"

const { login, reg, getList, edit, deleteOne, getUserInfo } = require('../dao/adminDao')

router.post(baseUrl + '/login', async (ctx) => {
    ctx.body = await login(ctx.request.body)
})
router.post(baseUrl + '/reg', async (ctx) => {
    ctx.body = await reg(ctx.request.body)
})
router.post(baseUrl + '/getList', async (ctx) => {
    ctx.body = await getList(ctx.request.body)
})
router.post(baseUrl + '/edit', async (ctx) => {
    ctx.body = await edit(ctx.request.body)
})
router.post(baseUrl + '/deleteOne', async (ctx) => {
    ctx.body = await deleteOne(ctx.request.body)
})
router.post(baseUrl + '/userInfo', async (ctx) => {
    ctx.body = await getUserInfo(ctx.request.body)
})
module.exports = router