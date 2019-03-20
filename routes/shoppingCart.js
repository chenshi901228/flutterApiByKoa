const Router = require('koa-router')
const router = new Router();

const { addTo, getList, edit, deleteOne} = require('../dao/shoppingCartDao')

const baseUrl = "/shoppingCart"

router.post(baseUrl + "/addTo", async (ctx) => {
    ctx.body = await addTo(ctx.request.body)
})
router.post(baseUrl + "/list", async (ctx) => {
    ctx.body = await getList(ctx.request.body)
})
router.post(baseUrl + "/edit", async (ctx) => {
    ctx.body = await edit(ctx.request.body)
})
router.post(baseUrl + "/deleteOne", async (ctx) => {
    ctx.body = await deleteOne(ctx.request.body)
})

module.exports = router