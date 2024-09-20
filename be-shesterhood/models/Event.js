const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');
const Subcategory = require('./Subcategory');

class Event extends Model {}

Event.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    caption: {
        type: DataTypes.STRING
    },
    imagePath: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    registrationLink: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Event'
});

Event.belongsTo(Category, { foreignKey: 'categoryId' });
Event.belongsTo(Subcategory, { foreignKey: 'subcategoryId' });

module.exports = Event;
