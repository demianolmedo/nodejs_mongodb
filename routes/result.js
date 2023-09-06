const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController')

//api/result
router.post('/', resultController.crearResult);
router.get('/', resultController.obtenerResult);
router.get('/:id', resultController.buscarResult);
router.put('/:id', resultController.actualizarResult);

module.exports = router