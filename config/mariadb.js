const Sequelize = require("sequelize");
const sequelize = new Sequelize("APPLPORDB", "userdev", "passdev2022!", {
  host: "172.23.223.71",
  dialect: "mariadb",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
});

const mysqlConnection = {};


mysqlConnection.Sequelize = Sequelize;
mysqlConnection.sequelize = sequelize;

//db.productos = require("../models/Producto.js")(sequelize, Sequelize);

module.exports = mysqlConnection;
