

const Sequelize = require('sequelize')
const Op = Sequelize.Op

const Image = require('./model/classify/images')
module.exports.getList = async function (imgs) {
    let res = await Image.findAll({ where: { type: "homeBanner" }, raw: true })
    return {
        code: 1,
        bannerImgs: res
    }
}
module.exports.add = async function ({ imgsId }) {
    let res = await Image.update({ type: "homeBanner" }, { where: { id: { [Op.in]: imgsId } } })
    if (res[0]) {
        return {
            code: 1,
            msg: "保存成功"
        }
    } else {
        return {
            code: 0,
            msg: "保存失败"
        }
    }
}
module.exports.deleteOne = async function (id) {
    let res = await Image.destroy({ where: id })
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