const { DataTypes } = require('sequelize');
const db = require('../../database');

const PokemonTable = db.define('Pokemon', {
    number: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    height: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    weight: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {timestamps: false, freezeTableName: true});

module.exports = PokemonTable;