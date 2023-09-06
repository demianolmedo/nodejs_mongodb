//Rutas para productos
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController')

//api/productos
router.post('/', productoController.crearProducto);
router.get('/', productoController.obtenerProducto);
router.put('/:id', productoController.actualizarProducto);
router.get('/:id', productoController.buscarProducto);
router.delete('/:id', productoController.eliminarProducto);

module.exports = router;