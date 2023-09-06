const db = require("../config/atc_mc");
const Multicentros = db.tbl_centros;






exports.crearMulticentros = async (req, res) => {    
            
        
         // Create a Producto
         const multicentros = {
            nombre: req.body.nombre,
            categoria: req.body.categoria,
            //published: req.body.published ? req.body.published : false
            ubicacion: req.body.ubicacion,
            precio: req.body.precio,
            fechaCreacion: req.body.fechaCreacion
        };

        // Save Producto in the database
        await Multicentros.create(tbl_centros)
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

exports.obtenerMulticentros = async (req, res) => {    
    
    Multicentros.findAll(
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


exports.actualizarMulticentros = async (req, res) => {    
    
    const id = req.params.id;

    Multicentros.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Multicentros was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Multicentros with id=${id}. Maybe Multicentros was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Multicentros with id=" + id
        });
      });

}

exports.buscarMulticentros = async (req, res) => {    

    const id = req.params.id;

    Multicentros.findByPk(id)
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

exports.eliminarMulticentros = async (req, res) => {    

    const id = req.params.id;

    Multicentros.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Multicentros was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Multicentros with id=${id}. Maybe Tutorial was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Multicentros with id=" + id
        });
      });

}