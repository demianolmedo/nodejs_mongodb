//const Producto = require("../models/Producto");
const mysqlConnection = require("../config/mariadb.js");
const Producto = mysqlConnection.productos;




exports.crearProducto = async (req, res) => {    
            
        
         // Create a Producto
         const producto = {
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            //published: req.body.published ? req.body.published : false
            ubicacion: req.body.ubicacion,
            precio: req.body.precio,
            fechaCreacion: req.body.fechaCreacion
        };

        // Save Producto in the database
        await Producto.create(producto)
            .then(data => {
            res.send(data);
            })
            .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while creating the Tutorial."
            });
            });
  
}

exports.obtenerProducto = async (req, res) => {    
    
    Producto.findAll(
      //  { where: { nombre: 'FTTH' } }
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

}


exports.actualizarProducto = async (req, res) => {    
    
    const id = req.params.id;

    Producto.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Producto was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Producto with id=${id}. Maybe Producto was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Producto with id=" + id
        });
      });

}

exports.buscarProducto = async (req, res) => {    

    const id = req.params.id;

    Producto.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Producto with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Producto with id=" + id
        });
      });

}

exports.eliminarProducto = async (req, res) => {    

    const id = req.params.id;

    Producto.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Producto was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Producto with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Producto with id=" + id
        });
      });

}