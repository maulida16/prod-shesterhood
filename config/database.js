// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('db_shesterhood', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

module.exports = sequelize;
