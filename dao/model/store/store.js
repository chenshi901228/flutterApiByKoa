const db = require('../defineModel')
const Sequelize = require('sequelize')

const Store = db.defineModel("store", {
    storeName: Sequelize.STRING,
    description: Sequelize.STRING,
    adminId: Sequelize.INTEGER
})

Store.sync().then(res => { })
module.exports = Store