const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(({
    dialect: "sqlite",
    storage: "./database/api.sqlite"
}));

function dbAuth() {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Database connected')
        })
        .catch((err) => {
            console.log('Database not connected sad', err)
        })
}


module.exports = {
    sequelize,
    dbAuth
};