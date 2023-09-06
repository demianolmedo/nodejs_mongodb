const express = require('express');
const router = express.Router();
const reasonController = require('../controllers/reasonController')

//api/reason
router.post('/', reasonController.crearReason);
router.get('/', reasonController.obtenerReason);
router.get('/:id', reasonController.buscarReason);
router.put('/:id', reasonController.actualizarReason);

module.exports = router