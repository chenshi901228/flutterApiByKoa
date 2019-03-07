

const db = require('../defineModel')
const Sequelize = require('sequelize')

const Admin = db.defineModel("admin", {
    phone: Sequelize.BIGINT,
    nick_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    password: Sequelize.STRING
})

Admin.sync().then(res => { })
module.exports = Admin