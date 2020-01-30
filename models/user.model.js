const { sequelize } = require('../config/database');
const { DataTypes, Model } = require('sequelize');
const sqliteConfig = require('../config/sqlite');

class User extends Model { };

User.init({
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ],
    email:
    {
        type: DataTypes.STRING,
        unique:true,
        validate: {
            isEmail: true
        }
    },
    password:
    {
        type: DataTypes.STRING,
        validate: {
            notEmpty: true
        }
    }
}, { sequelize, modelName: "user" });

User.sync(sqliteConfig[process.env.NODE_ENV]);

module.exports = User;