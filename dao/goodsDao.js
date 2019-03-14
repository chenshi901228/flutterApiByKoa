
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Store = require('./model/store/store')
const Classify = require('./model/classify/classify')
const Goods = require('./model/goods/goods')
const Size = require('./model/goods/size')
const Image = require('./model/classify/images')

module.exports.initAddGoods = async function (adminId) {
    console.log(adminId)
    let storeList = await Store.findAll({ where: adminId, raw: true })
    let classifyList = await Classify.findAll({ raw: true })
    return {
        code: 1,
        storeList,
        classifyList
    }
}
module.exports.addGoods = async function (goods) {
    let res_goods = await Goods.create({
        goodsName: goods.goodsName,
        description: goods.description,
        store: goods.store,
        classify: goods.classify
    }).then(res => { return res.get({ plain: true }) })
        .catch(error => { return error })
    let res_Imgs = await Image.update({ belongId: res_goods.id, type: "goodsImg" }, { where: { id: { [Op.in]: goods.imgsListId } } })
    let res_size = await Promise.all(goods.priceAndSize.map(async item => {
        return await Size.create({
            price: item.p,
            size: item.s,
            goodsId: res_goods.id
        }).then(res => { return res.get({ plain: true }) })
            .catch(error => error)
    }))
    if (res_goods && res_Imgs[0]) {
        return {
            code: 1,
            msg: "添加商品成功"
        }
    } else {
        return {
            code: 0,
            msg: "添加商品失败"
        }
    }
}
module.exports.goodsList = async function (adminId) {
    let storeArr = []
    let res_store = await Store.findAll({ where: adminId, raw: true })
    res_store.map(item => {
        storeArr.push(item.storeName)
    })
    let list = await Goods.findAll({ where: { store: { [Op.in]: storeArr } }, raw: true })
        .then(res => res)
        .catch(err => err)
    let res = await Promise.all(
        list.map(async item => {
            let res_imgs = await Image.findAll({
                where: {
                    belongId: item.id,
                    type: "goodsImg"
                }, raw: true
            })
            let res_size = await Size.findAll({
                where: {
                    goodsId: item.id
                }
            })
            item.goodsImgs = res_imgs
            item.priceAndSize = res_size
            return item
        })
    )
    return {
        code: 1,
        list: res
    }
}