const db = require('../defineModel')
const Sequelize = require('sequelize')

const ShoppingCart = db.defineModel("shoppingCart", {
    adminId: Sequelize.INTEGER,
    goodsId: Sequelize.INTEGER,
    count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    sizeId: Sequelize.INTEGER
})

ShoppingCart.sync().then(res => { })
module.exports = ShoppingCart