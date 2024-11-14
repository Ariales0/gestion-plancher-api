const sequelize = require("../config/dbConfig"); // Importation de la connexion à la base de données
const { DataTypes } = require("sequelize"); // Importation du module sequelize

const Broker = sequelize.define("brokers", {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    ipv4: {
        type: DataTypes.STRING(17),
        allowNull: false
    },
    port: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    tableName: "brokers",
    indexes: [
        {
            name: "PRIMARY",
            unique: true,
            fields: [
                { name: "id" }
            ]
        },
        {
            name: "ipv4",
            unique: true,
            fields: [
                { name: "ipv4" }
            ]
        }
    ]
});

module.exports = Broker;