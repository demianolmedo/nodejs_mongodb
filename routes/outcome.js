const express = require('express');
const router = express.Router();
const outcomeontroller = require('../controllers/outcomeController')

//api/plataformas

router.get('/:plataforma/:outcome', outcomeontroller.buscarOutcome);

module.exports = router