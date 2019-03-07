var Sequelize = require('sequelize');

var config = new Sequelize({
    dialect: 'mysql', // 支持何种数据库: mysql, mariadb, postgres, mssql
    database: 'flutter_sql',//数据库名称
    host: 'localhost',//连接地址
    port: '3306',//端口
    username: 'root',//用户名
    password: 'Chenshi123@',//密码
});

module.exports = config;