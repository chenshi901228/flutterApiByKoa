const db = require('../defineModel')
const Sequelize = require('sequelize')

const Image = db.defineModel("image", {
    url: Sequelize.STRING,
    type: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    belongId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null
    }
})

Image.sync().then(res => { })
module.exports = Image