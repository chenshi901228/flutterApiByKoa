
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
    let goodsList = await Goods.findAll({ raw: true })
    return {
        code: 1,
        storeList,
        classifyList,
        goodsList
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
module.exports.getOne = async function (params) {
    const id = (typeof params) == "string" ? JSON.parse(params) : params
    const res = await Goods.findAll({ where: id, raw: true })
    const goodsimgs = await Image.findAll({
        where: {
            belongId: id.id,
            type: "goodsImg"
        }, raw: true
    })
    const storeId = await Store.findOne({ where: { storeName: res[0].store }, raw: true })
    const store_logo = await Image.findAll({
        where: {
            belongId: storeId.id,
            type: "storelogoImg"
        }, raw: true
    })
    const goods_size = await Size.findAll({ where: { goodsId: id.id } })
    res[0].goodsimgs = goodsimgs.map(item => item.url.replace("localhost:3001\\", "192.168.56.1:3001/"))
    res[0].store_id = storeId.id
    res[0].store_logo = store_logo[0].url.replace("localhost:3001\\", "192.168.56.1:3001/")
    const price_size = goods_size.map(item => {
        let obj = {}
        obj.price = item.price
        obj.size = item.size
        return obj
    })
    const priceSort = price_size.sort((a, b) => parseInt(a.price) - parseInt(b.price))
    res[0].price = priceSort.length == 1 ? priceSort[0].price : `${priceSort[0].price}-${priceSort[priceSort.length - 1].price}`
    res[0].priceAndSize = price_size
    return {
        code: 1,
        goodsDetails: res[0]
    }
}