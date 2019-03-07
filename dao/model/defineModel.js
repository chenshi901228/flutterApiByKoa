
var Sequelize = require('sequelize');
var sequelize = require('../../config/mysql_config')
var moment = require('moment');

/**
 * 定义数据模型
 * 
 * @param {any} name 模型名称【数据库表名】
 * @param {any} attributes 数据字段集合
 * @returns 数据模型对象
 */
function defineModel(name, attributes) {
    var attrs = {};
    // 附加公共字段
    attrs.id = {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    };
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }

    attrs.createAt = {
        type: Sequelize.STRING,
        allowNull: false
    };
    // attrs.updateAt = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // attrs.version = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // 状态：0表示有效，1表示无效，2表示已删除，默认为0.
    // attrs.status = {
    //     type: Sequelize.INTEGER,
    //     defaultValue: 0,
    //     allowNull: false
    // };

    // 调用seq的方法定义模型并返回
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = moment().format("YYYY-MM-DD HH:mm:ss");
                if (obj.isNewRecord) {
                    obj.createAt = now;
                    obj.updateAt = now;
                    obj.version = 0;
                } else {
                    obj.updateAt = now;
                    ++obj.version;
                }
            }
        }
    });
}


module.exports.defineModel = defineModel