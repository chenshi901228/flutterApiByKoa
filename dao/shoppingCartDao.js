

const Sequelize = require('sequelize')
const Op = Sequelize.Op
const ShoppingCart = require('./model/shoppingCart/shoppingCart')
const Goods = require('./model/goods/goods')
const Size = require('./model/goods/size')
const Image = require('./model/classify/images')
module.exports.addTo = async function (params) {
    const isExist = await ShoppingCart.findAll({ where: params, raw: true })
    if (isExist.length) {
        await ShoppingCart.update({ count: isExist[0].count + 1 }, { where: { id: isExist[0].id } })
        return { code: 1, msg: "添加到购物车成功" }
    } else {
        const res = await ShoppingCart.create(params)
            .then(res => res.get({ plain: true }))
            .catch(error => error)
        if (res) {
            return {
                code: 1,
                msg: "添加到购物车成功"
            }
        } else {
            return {
                code: 0,
                msg: "添加到购物车失败"
            }
        }
    }
}
module.exports.getList = async function (params) {
    const adminId = (typeof params) == "string" ? JSON.parse(params) : params
    const list = await ShoppingCart.findAll({ where: adminId, raw: true })
    const whereId = list.map(item => {
        return item.goodsId
    })
    const countList = list.map(item => {
        return item.count
    })
    const res_goodsList = await Goods.findAll({ where: { id: { [Op.in]: whereId } }, raw: true })
    const goodsList = await Promise.all(
        res_goodsList.map(async (item, index) => {
            const res_size = await Size.findAll({ where: { goodsId: item.id }, raw: true })
            const res_imgs = await Image.findAll({ where: { type: "goodsImg", belongId: item.id }, raw: true, limit: 1 })
            item.price = res_size[0].price
            item.size = res_size[0].size
            item.imgUrl = res_imgs[0].url.replace("localhost:3001\\", "192.168.56.1:3001/")
            item.count = countList[index]
            item.shoppingCartId = list[index].id
            return item
        })
    )
    return {
        code: 1,
        list: goodsList
    }
}
module.exports.edit = async function (params) {
    const data = (typeof params) == "string" ? JSON.parse(params) : params
    const res = await ShoppingCart.update({ count: data.count }, { where: { id: data.id } })
    if (res[0]) {
        return {
            code: 1
        }
    } else {
        return {
            code: 0
        }
    }
}
module.exports.deleteOne = async function (params) {
    const data = (typeof params) == "string" ? JSON.parse(params) : params
    console.log(data)
    const res = await ShoppingCart.destroy({ where: { id: { [Op.in]: data.shoppingCartId } } })
    if (res) {
        return {
            code: 1,
            msg: "删除商品成功"
        }
    } else {
        return {
            code: 0,
            msg: "删除商品失败"
        }
    }
}