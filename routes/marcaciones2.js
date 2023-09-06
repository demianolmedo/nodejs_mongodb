//Rutas para productos
const express = require('express');
const router = express.Router();
const marcacionesmongoController = require('../controllers/marcacionesmongoController')
const marcacionesController = require('../controllers/marcacionesController')



//api/productos
//router.post('/', multicentrosController.crearProducto);
//router.get('/:id', marcacionesController.obtenerMarcaciones);
//router.post('/', marcacionesController.buscarMarcaciones);
//router.post('/registrar/', marcacionesController.guardaMarcaciones);
//router.post('/salida/', marcacionesController.salidaMarcaciones);
//router.get('/', marcacionesController.obtenerUsuarios);
router.get('/', marcacionesController.obtenerPlataformas);
//router.get('/', marcacionesmongoController.obtenerMarcacionmdb);
//router.post('/', marcacionesmongoController.crearMarcaciones);
//router.put('/:id', multicentrosController.actualizarProducto);
//router.get('/:id', multicentrosController.buscarProducto);
//router.delete('/:id', multicentrosController.eliminarProducto);

module.exports = router;