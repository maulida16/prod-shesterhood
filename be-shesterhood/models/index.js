const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/database.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import models
const Event = require('./Event');
const Category = require('./Category');
const Subcategory = require('./Subcategory');

// Hubungan model
Category.hasMany(Event, { foreignKey: 'categoryId', as: 'Category' });
Subcategory.hasMany(Event, { foreignKey: 'subcategoryId', as: 'Subcategory' });

Event.belongsTo(Category, { as: 'Category', foreignKey: 'categoryId' });
Event.belongsTo(Subcategory, { as: 'Subcategory', foreignKey: 'subcategoryId' });

// Tambahkan model ke db object
db.Event = Event;
db.Category = Category;
db.Subcategory = Subcategory;

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
