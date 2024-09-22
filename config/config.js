require('dotenv').config();
const config = require('./config.json');

module.exports = {
  development: {
    ...config.development,
    username: process.env.DB_USER || config.development.username,
    password: process.env.DB_PASSWORD || config.development.password,
    database: process.env.DB_NAME || config.development.database,
    host: process.env.DB_HOST || config.development.host,
  },
  production: {
    ...config.production,
    username: process.env.DB_USER || config.production.username,
    password: process.env.DB_PASSWORD || config.production.password,
    database: process.env.DB_NAME || config.production.database,
    host: process.env.DB_HOST || config.production.host,
  },
};
