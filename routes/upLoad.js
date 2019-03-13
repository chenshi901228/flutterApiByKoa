const Router = require('koa-router')
const router = new Router

const path = require("path")
const fs = require('fs')
const multer = require('koa-multer')

const { addImage } = require('../dao/imageDao')

const upload = multer({ dest: 'uploads/' });


router.post("/singleUpLoad", upload.single('file'), async (ctx) => {
    const uploadPath = __dirname.replace("routes", "uploads")
    const file = ctx.request.files.file
    const filePath = path.join(uploadPath, Date.now() + "-" + file.name)
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    ctx.body = await addImage({ url: filePath.replace(uploadPath, "http://localhost:3001") })
})

module.exports = router