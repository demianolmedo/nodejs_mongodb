module.exports = (sequelize, Sequelize) => {
    const MulticentrosModel = sequelize.define("tbl_centros", {
      centro: {
        type: Sequelize.STRING
      },
      nombre_depto: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      atencion: {
        type: Sequelize.STRING
      },
      sabado: {
        type: Sequelize.STRING
      },
      domingo: {
        type: Sequelize.STRING
      },
      obs: {
        type: Sequelize.STRING
      } ,
      obs_mayoristas: {
        type: Sequelize.STRING
      } ,
      supervisor: {
        type: Sequelize.STRING
      } ,
      celular_super: {
        type: Sequelize.STRING
      } ,
      telefono_super: {
        type: Sequelize.STRING
      } ,
      fax: {
        type: Sequelize.STRING
      } ,
      logistico: {
        type: Sequelize.STRING
      },
      lider: {
        type: Sequelize.STRING
      },
      celular_lider: {
        type: Sequelize.STRING
      },
      telefono_lider: {
        type: Sequelize.STRING
      },
      referencia: {
        type: Sequelize.STRING
      },
      vigente: {
        type: Sequelize.STRING
      },
      latitud: {
        type: Sequelize.STRING
      },
      longitud: {
        type: Sequelize.STRING
      },
      img_b64: {
        type: Sequelize.STRING
      }
      
    });
  
    return MulticentrosModel;
  };