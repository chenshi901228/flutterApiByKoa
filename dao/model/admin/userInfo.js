

const db = require('../defineModel')
const Sequelize = require('sequelize')

const UserInfo = db.defineModel("userinfo", {
    userId: Sequelize.INTEGER,
    // 头像
    headImg: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    nick_name: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "系统默认"
    },
    // 等级
    level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    // 头衔
    actor: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "小垃圾"
    },
    // 推荐人
    referrer: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "系统推荐"
    },
    // 邀请码
    inviteCode: {
        type: Sequelize.INTEGER,
        defaultValue: Math.floor(Math.random() * 89999 + 10000)
    },
    // 本月消费
    consumptionOfMonth: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    // 累计收益
    accumulatedEarnings: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    // 即将到账
    willget: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    // 账户余额
    balanceAccount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})

UserInfo.sync().then(res => { })
module.exports = UserInfo