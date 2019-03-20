const moment = require('moment')
const Classify = require('./model/classify/classify')
const Goods = require('./model/goods/goods')
const Image = require('./model/classify/images')
const Size = require('./model/goods/size')

module.exports.initHomePage = async function (data) {
    let goodsListres = await Goods.findAll({ raw: true, limit: 12 })
    let classifyList = await Classify.findAll({ raw: true })
    let res_bannerImgsList = await Image.findAll({ where: { type: "homeBanner" }, raw: true })
    let goodsList = await Promise.all(goodsListres.map(async item => {
        let goodsImgs = await Image.findAll({
            where: {
                type: "goodsImg",
                belongId: item.id
            }, raw: true, limit: 1
        })
        let goodsPrice = await Size.findAll({ where: { goodsId: item.id }, raw: true, limit: 1 })
        item.goodsImg = goodsImgs[0].url.replace("localhost:3001\\", "192.168.56.1:3001/")
        item.price = goodsPrice[0].price
        return item
    }))
    let bannerImgsList = res_bannerImgsList.map(item => {
        let obj = {}
        obj.url = item.url.replace("localhost:3001\\", "192.168.56.1:3001/")
        return obj
    })

    return {
        code: 1,
        msg: "初始化成功",
        goodsList,
        classifyList,
        bannerImgsList,
    }
}


module.exports.getLastTime = async function () {
    const time = moment().format("YYYY-MM-DD") + " 18:00:00";
    const dealOfToday = 5689421
    return {
        code: 1,
        lastTime: {
            time, dealOfToday
        }
    }
}