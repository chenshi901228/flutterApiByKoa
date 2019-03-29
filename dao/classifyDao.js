
const Classify = require('./model/classify/classify')
const Goods = require('./model/goods/goods')
const Image = require('./model/classify/images')
const Size = require('./model/goods/size')

module.exports.add = async function (data) {
    let res = await Classify.create(data)
        .then(res => { return res.get({ plain: true }) })
        .catch(error => { return error })
    if (res) {
        return { code: 1, msg: "添加分类成功" }
    } else {
        return { code: 0, msg: res }
    }
}
module.exports.getList = async function () {
    let res = await Classify.findAll({ raw: true })
        .then(res => { return res })
        .catch(error => { return error })
    return {
        code: 1,
        list: res
    }
}
module.exports.deleteOne = async function (id) {
    let res = await Classify.destroy({ where: id })
        .then(res => { return res })
        .catch(error => { return error })
    if (res) {
        return {
            code: 1,
            msg: "删除成功"
        }
    } else {
        return {
            code: 0,
            msg: "删除失败"
        }
    }
}
module.exports.edit = async function (data) {
    let res = await Classify.update({ title: data.title }, { where: { id: data.id } })
    if (res[0]) {
        return {
            code: 1,
            msg: "修改信息成功"
        }
    } else {
        return {
            code: 0,
            msg: "修改信息失败"
        }
    }
}

module.exports.getGoodsList = async function (params) {
    const classify = (typeof params) == "string" ? JSON.parse(params) : params
    const res_goods = await Goods.findAll({ where: classify, raw: true, limit: 10 })
    const goodsList = await Promise.all(
        res_goods.map(async item => {
            const goodsImg = await Image.findOne({
                where: {
                    belongId: item.id,
                    type: "goodsImg"
                }, raw: true
            })
            const goodsPrice = await Size.findOne({ where: { goodsId: item.id }, raw: true })
            item.goodsImg = goodsImg.url.replace("localhost:3001\\", "192.168.56.1:3001/")
            item.price = goodsPrice.price
            return item
        })
    )
    return {
        code: 1,
        goodsList
    }
}