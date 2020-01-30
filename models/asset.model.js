const { sequelize } = require('../config/database');
const { DataTypes, Model } = require('sequelize');
const sqliteConfig = require('../config/sqlite');

class Asset extends Model {};

Asset.init({
    name: {type: DataTypes.STRING, validate: {notEmpty: true}},
    url: {type: DataTypes.STRING, validate: {notEmpty: true}}
}, {sequelize, modelName: "asset"});

Asset.sync(sqliteConfig[process.env.NODE_ENV]);

module.exports = Asset;