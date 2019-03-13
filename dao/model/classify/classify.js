const db = require('../defineModel')
const Sequelize = require('sequelize')

const Classify = db.defineModel("classify", {
    title: Sequelize.STRING,
})

Classify.sync().then(res => { })
module.exports = Classify