
const Classify = require('./model/classify/classify')

module.exports.add = async function (data) {
    let res = await Classify.create(data)
        .then(res => { return res.get({ plain: true }) })
        .catch(error => { return error })
    if (res) {
        return { code: 1, msg: "添加分类成功" }
    } else {
        return { code: 0, msg: res }
    }
}
module.exports.getList = async function () {
    let res = await Classify.findAll({ raw: true })
        .then(res => { return res })
        .catch(error => { return error })
    return {
        code: 1,
        list: res
    }
}
module.exports.deleteOne = async function (id) {
    let res = await Classify.destroy({ where: id })
        .then(res => { return res })
        .catch(error => { return error })
    if (res) {
        return {
            code: 1,
            msg: "删除成功"
        }
    } else {
        return {
            code: 0,
            msg: "删除失败"
        }
    }
}
module.exports.edit = async function (data) {
    let res = await Classify.update({ title: data.title }, { where: { id: data.id } })
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