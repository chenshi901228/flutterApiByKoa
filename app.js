const Koa = require('koa');
const Router = require('koa-router');
const Cors = require('koa2-cors');
const logger = require('koa-logger')
const body = require('koa-body')
const koajwt = require('koa-jwt')
const static = require('koa-static')

const app = new Koa();
const router = new Router();

// 路由设置
const AdminRouter = require('./routes/admin')
const InitHomePageRouter = require('./routes/initHomePage')
const ClassifyRouter = require('./routes/classify')
const UpLoadRouter = require('./routes/upLoad')
const StoreRouter = require('./routes/store')
const GoodsRouter = require('./routes/goods')
const HomeBannerRouter = require('./routes/homeBanner')
const ShoppingCartRouter = require('./routes/shoppingCart')
// 添加路由
const routes = [
    AdminRouter,
    InitHomePageRouter,
    ClassifyRouter,
    UpLoadRouter,
    StoreRouter,
    GoodsRouter,
    HomeBannerRouter,
    ShoppingCartRouter
]


// 请求头设置
app.use(Cors({
    origin: function (ctx) {
        return "*"
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', "Access-Control-Allow-Origin", "x-requested-with"],
}))
// 请求日志
app.use(logger((str, args) => {
    console.log(args.slice(1))
}))
// token请求
app.use((ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            const msg = err.originalError ? err.originalError.message : err.message
            ctx.body = {
                code: 0,
                msg: msg == "jwt expired" ? "登录失效，重新登录" : msg
            };
        } else {
            throw err;
        }
    })
})
// 静态文件夹
app.use(static("uploads/"))
// token验证
app.use(koajwt({ secret: "my_token" }).unless({
    path: [/\/admin\/login/, /\/admin\/reg/]
}))


// 前端传递的参数的解析
app.use(body({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}))
// 路由
routes.map(item => {
    app.use(item.routes(), router.allowedMethods())
})
// 监听端口
app.listen(3001);