const Sequelize = require('sequelize');

const db = new Sequelize(
    process.env.database,
    process.env.user,
    process.env.password,    
    {
        host: process.env.dbHost,
        dialect: 'mysql'
    }
);

module.exports = db;