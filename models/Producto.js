module.exports = (sequelize, Sequelize) => {
    const Producto = sequelize.define("producto", {
      nombre: {
        type: Sequelize.STRING
      },
      categoria: {
        type: Sequelize.STRING
      },
      ubicacion: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.STRING
      },
      fechaCreacion: {
        type: Sequelize.STRING
      }      
    });
  
    return Producto;
  };