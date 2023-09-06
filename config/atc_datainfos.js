const Sequelize = require("sequelize");
const sequelize = new Sequelize("DataInfo", "usccentera","alcc2378001", {
  host: "150.1.88.224",
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