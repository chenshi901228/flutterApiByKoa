const Sequelize = require('sequelize')

const Op = Sequelize.Op;
const Store = require('./model/store/store')
const Admin = require('./model/admin/admin')
const Image = require('./model/classify/images')
const Goods = require('./model/goods/goods')
const Size = require('./model/goods/size')


module.exports.addStore = async function (store) {
    let isHase = await Store.findAll({ where: { storeName: store.storeName }, raw: true })
        .then(res => { return res })
        .catch(error => { return error })
    if (isHase.length) {
        return { code: 0, msg: "店铺名已存在，请重新输入" }
    } else {
        let resStore = await Store.create({
            storeName: store.storeName,
            description: store.description,
            adminId: store.adminId
        })
            .then((res) => { return res.get({ plain: true }) })
            .catch(error => { return error })
        let resStorebannerImgs = await Image.update({ belongId: resStore.id, type: "storeBannerImg" }, { where: { id: { [Op.in]: store.bannerImgs } } })
        let resStorelogoImg = await Image.update({ belongId: resStore.id, type: "storelogoImg" }, { where: { id: store.logoImg } })

        console.log(resStore, resStorebannerImgs, resStorelogoImg)
        if (resStore && resStorebannerImgs[0] && resStorelogoImg[0]) {
            return {
                code: 1,
                msg: "添加店铺成功"
            }
        } else {
            Store.destroy({ where: { storeName: store.storeName } })
            Image.destroy({ where: { id: { [Op.in]: store.bannerImgs } } })
            Image.destroy({ where: { id: store.logoImg } })
            return {
                code: 0,
                msg: "添加店铺失败"
            }
        }
    }
}
module.exports.storeList = async function (adminId) {
    let list = await Store.findAll({ where: adminId, raw: true })
        .then(res => { return res })
        .catch(error => { return error })
    let result = await Promise.all(list.map(async item => {
        let storeBannerImgs = await Image.findAll({
            where: {
                belongId: item.id,
                type: "storeBannerImg"
            }, raw: true
        })
        let storelogoImg = await Image.findAll({
            where: {
                belongId: item.id,
                type: "storelogoImg"
            }, raw: true
        })
        item.storelogoImg = storelogoImg
        item.storeBannerImgs = storeBannerImgs
        return item
    }))
    return {
        code: 1,
        list
    }
}
module.exports.storeDetails = async function (params) {
    const {storeId} = (typeof params) == "string" ? JSON.parse(params) : params
    let list = {}
    const res_store = await Store.findOne({ where: { id: storeId } })
    const storeBannerImgs = await Image.findOne({
        where: {
            belongId: storeId,
            type: "storeBannerImg"
        }, raw: true
    })
    const storelogoImg = await Image.findOne({
        where: {
            belongId: storeId,
            type: "storelogoImg"
        }, raw: true
    })
    const res_goods = await Goods.findAll({ where: { store: res_store.storeName }, raw: true })
    const goodsList = await Promise.all(
        res_goods.map(async item => {
            const goodsImg = await Image.findOne({
                where: {
                    belongId: item.id,
                    type: "goodsImg"
                }, raw: true
            })
            const goodsPrice = await Size.findOne({ where: { goodsId: item.id }, raw: true })
            item.goodsImg = goodsImg.url.replace("localhost:3001\\","192.168.56.1:3001/")
            item.price = goodsPrice.price
            return item
        })
    )
    list.storeName = res_store.storeName
    list.description = res_store.description
    list.storeBannerImgs = storeBannerImgs.url.replace("localhost:3001\\","192.168.56.1:3001/")
    list.storelogoImg = storelogoImg.url.replace("localhost:3001\\","192.168.56.1:3001/")
    list.goodsList = goodsList
    return {
        code: 1,
        list
    }
}