const Router = require('koa-router')
const router = new Router

const baseUrl = "/store"

const { addStore, storeList, storeDetails } = require('../dao/storeDao')


router.post(baseUrl + "/addStore", async (ctx) => {
    ctx.body = await addStore(ctx.request.body)
})
router.post(baseUrl + "/storeList", async (ctx) => {
    ctx.body = await storeList(ctx.request.body)
})
router.post(baseUrl + "/storeDetails", async (ctx) => {
    ctx.body = await storeDetails(ctx.request.body)
})
module.exports = router