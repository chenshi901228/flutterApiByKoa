const Router = require('koa-router')
const router = new Router

const baseUrl = "/goods"

const { initAddGoods, addGoods, goodsList, getOne } = require('../dao/goodsDao')

router.post(baseUrl + "/initAddGoods", async (ctx) => {
    ctx.body = await initAddGoods(ctx.request.body)
})
router.post(baseUrl + "/addGoods", async (ctx) => {
    ctx.body = await addGoods(ctx.request.body)
})
router.post(baseUrl + "/goodsList", async (ctx) => {
    ctx.body = await goodsList(ctx.request.body)
})
router.post(baseUrl + "/getOne", async (ctx) => {
    ctx.body = await getOne(ctx.request.body)
})
module.exports = router