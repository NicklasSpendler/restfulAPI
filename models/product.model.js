const { sequelize } = require('../config/database');
const { DataTypes, Model } = require('sequelize');
const sqliteConfig = require('../config/sqlite')

class Product extends Model {}

Product.init({
    name: {type: DataTypes.STRING, validate: {notEmpty: true}},
    price: {type: DataTypes.FLOAT, allowNull:false, validate: {notNull: true, isFloat: true}},
    description: {type: DataTypes.STRING, validate: {notEmpty: true}}
}, {sequelize, modelName: "product"});

Product.sync(sqliteConfig[process.env.NODE_ENV]);

module.exports = Product;