
const Image = require('./model/classify/images')

module.exports.addImage = async function (url) {
    let res = await Image.create(url)
        .then(res => { return res.get({ plain: true }) })
        .catch(error => { return error })
    if (res) {
        return { code: 1, id: res.id }
    } else {
        return res
    }
}