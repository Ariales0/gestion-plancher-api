const sequelize = require("../config/dbConfig"); // Importation de la connexion à la base de données
const { DataTypes } = require("sequelize"); // Importation du module sequelize

const Thermostat = sequelize.define(
  "thermostats",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
    broker_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "brokers",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "thermostats",
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        fields: [{ name: "id" }],
      },
      {
        name: "unique_thermostat",
        unique: true,
        fields: ["name", "user_id", "broker_id"],
      },
    ],
  }
);

module.exports = Thermostat;
