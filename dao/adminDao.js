
const Admin = require('./model/admin/admin')
const jwt = require('jsonwebtoken')
const UserInfo = require('./model/admin/userInfo')


module.exports.login = async function (data) {
    let database = (typeof data) == "string" ? JSON.parse(data) : data
    let res = await Admin.findAll({ where: database, raw: true })
        .then(res => { return res })
        .catch(error => { return error })
    if (res.length) {
        const token = jwt.sign({
            phone: res[0].phone,
            id: res[0].id
        }, "my_token", { expiresIn: "2h" })
        return {
            token: token,
            code: 1,
            msg: "登录成功",
            phone: res[0].phone,
            id: res[0].id
        }
    } else {
        return {
            token: null,
            code: 0,
            msg: "用户名或密码错误"
        }
    }
}
module.exports.reg = async function (data) {
    let database = (typeof data) == "string" ? JSON.parse(data) : data
    let res_find = await Admin.findAll({ where: { phone: database.phone }, raw: true })
        .then(res => { return res })
        .catch(error => { return error })
    if (res_find.length) {
        return { msg: "用户已存在", code: 0 }
    } else {
        let result
        let res_create = await Admin.create(database)
            .then(res => { return res.get({ plain: true }) })
            .catch(error => { return error })
        if (res_create) {
            await UserInfo.create({ userId: res_create.id })
            const token = jwt.sign({
                phone: res_create.phone,
                id: res_create.id
            }, "my_token", { expiresIn: "2h" })
            result = {
                token: token,
                code: 1,
                msg: "注册成功"
            }
        } else {
            result = {
                token: null,
                code: 0,
                msg: res_create
            }
        }
        return result
    }
}

module.exports.getList = async function (data) {
    let list = await Admin.findAll({ raw: true }).then((res) => {
        return res
    })
    return {
        code: 1,
        list
    }
}
module.exports.edit = async function (data) {
    let res = await Admin.update({ nick_name: data.nick_name, password: data.password }, { where: { id: data.id } })
    if (res[0]) {
        return {
            code: 1,
            msg: "修改信息成功"
        }
    } else {
        return {
            code: 0,
            msg: "修改信息失败"
        }
    }
}

module.exports.deleteOne = async function ({ id } = data) {
    let res = await Admin.destroy({ where: { id } })
    console.log(res)
    if (res) {
        return {
            code: 1,
            msg: "删除用户成功"
        }
    } else {
        return {
            code: 0,
            msg: "删除用户失败"
        }
    }
}


module.exports.getUserInfo = async function (params) {
    const { userId } = (typeof params) == "string" ? JSON.parse(params) : params
    const res_userInfo = await UserInfo.findOne({ where: { userId }, raw: true })
    return {
        code: 1,
        userInfo: res_userInfo
    }
}