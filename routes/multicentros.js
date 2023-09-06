//Rutas para productos
const express = require('express');
const router = express.Router();
const multicentrosController = require('../controllers/multicentrosController')

//api/productos
//router.post('/', multicentrosController.crearProducto);
router.get('/', multicentrosController.obtenerMulticentros);
//router.put('/:id', multicentrosController.actualizarProducto);
//router.get('/:id', multicentrosController.buscarProducto);
//router.delete('/:id', multicentrosController.eliminarProducto);

module.exports = router;