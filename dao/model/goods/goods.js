const db = require('../defineModel')
const Sequelize = require('sequelize')

const Goods = db.defineModel("goods", {
    goodsName: Sequelize.STRING,
    description: Sequelize.STRING,
    store: Sequelize.STRING,
    classify: Sequelize.STRING
})

Goods.sync().then(res => { })
module.exports = Goods