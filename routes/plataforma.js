const express = require('express');
const router = express.Router();
const plataformaController = require('../controllers/plataformaController')

//api/plataformas
router.post('/', plataformaController.crearPlataforma);
router.get('/', plataformaController.obtenerPlataforma);
router.get('/:id', plataformaController.buscarPlataforma);
router.put('/:id', plataformaController.actualizarPlataforma);

module.exports = router