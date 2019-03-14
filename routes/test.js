const Router = require('koa-router')
const router = new Router



router.post("/test", async (ctx) => {
    ctx.body = { code: 1, msg: "您有权限操作" }
})

module.exports = router