const Router = require('koa-router')
const router = new Router


const baseUrl = "/classify"

const { add, getList, deleteOne, edit, getGoodsList } = require('../dao/classifyDao')

router.post(baseUrl + "/add", async (ctx) => {
    ctx.body = await add(ctx.request.body)
})
router.post(baseUrl + "/getList", async (ctx) => {
    ctx.body = await getList(ctx.request.body)
})
router.post(baseUrl + "/deleteOne", async (ctx) => {
    ctx.body = await deleteOne(ctx.request.body)
})

router.post(baseUrl + "/edit", async (ctx) => {
    ctx.body = await edit(ctx.request.body)
})
router.post(baseUrl + "/getGoodsList", async (ctx) => {
    ctx.body = await getGoodsList(ctx.request.body)
})


module.exports = router