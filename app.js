const Koa = require('koa');
const Router = require('koa-router');
const Cors = require('koa2-cors');
const logger = require('koa-logger')
const body = require('koa-body')
const koajwt = require('koa-jwt')

const app = new Koa();
const router = new Router();

// 路由设置
const AdminRouter = require('./routes/admin')
const InitHomePageRouter = require('./routes/initHomePage')
// 添加路由
const routes = [
    AdminRouter,
    InitHomePageRouter
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
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
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
            ctx.body = {
                code: 0,
                msg: err.originalError ? err.originalError.message : err.message
            };
        } else {
            throw err;
        }
    })
})

app.use(koajwt({ secret: "my_token" }).unless({
    path: [/\/admin\/login/, /\/admin\/reg/]
}))

// 前端传递的参数的解析
app.use(body())
// 路由
routes.map(item => {
    app.use(item.routes(), router.allowedMethods())
})
// 监听端口
app.listen(3000);