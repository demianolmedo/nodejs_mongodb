const Sequelize = require("sequelize");
const sequelize = new Sequelize("BD_NOMBRE", "USER","PASS", {
  host: "NOST",
  dialect: "mysql",
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: false
},
logging: false
});

const atcConnection = {};


atcConnection.Sequelize = Sequelize;
atcConnection.sequelize = sequelize;

//atcConnection.tbl_centros = require("../models/Multicentros")(sequelize, Sequelize);

module.exports = atcConnection;
