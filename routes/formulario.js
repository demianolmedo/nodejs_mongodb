const express = require('express');
const router = express.Router();
const formularioController = require('../controllers/formularioController')

//api/formularios
router.post('/', formularioController.crearFormulario);
router.get('/', formularioController.obtenerFormulario);
router.get('/:id', formularioController.buscarFormulario);
router.put('/:id', formularioController.actualizarFormulario);

module.exports = router