const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

class Subcategory extends Model {}

Subcategory.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Subcategory'
});

Subcategory.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Subcategory, { foreignKey: 'categoryId' });

module.exports = Subcategory;
