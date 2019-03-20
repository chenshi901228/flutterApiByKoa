const Router = require('koa-router');
const router = new Router();

const dataBase = "/homeBanner"

const { getList, add, deleteOne} = require('../dao/homeBanner')

router.post(dataBase + '/list', async (ctx) => {
    ctx.body = await getList(ctx.request.body)
})
router.post(dataBase + '/add', async (ctx) => {
    ctx.body = await add(ctx.request.body)
})
router.post(dataBase + '/delete', async (ctx) => {
    ctx.body = await deleteOne(ctx.request.body)
})
module.exports = router