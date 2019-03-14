const db = require('../defineModel')
const Sequelize = require('sequelize')

const Size = db.defineModel("size", {
    price: Sequelize.STRING,
    size: Sequelize.STRING,
    goodsId:Sequelize.INTEGER
})

Size.sync().then(res => { })
module.exports = Size