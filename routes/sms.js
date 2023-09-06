const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var path = require('path');

const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

const mysqlConnection = require('../config/sms');


// create application/json parser
var jsonParser = bodyParser.json()


router.get('/', (req,res)=>{
    mysqlConnection.sequelize.query("SELECT sms_tramite.tramite, sms_persona.persona,    sms_titularidad.requisitos FROM sms_persona INNER JOIN sms_titularidad ON sms_persona.id_persona = sms_titularidad.id_rel INNER JOIN sms_tramite ON sms_tramite.id_tramite = sms_persona.id_rel WHERE sms_titularidad.titularidad LIKE '%APN' ORDER BY sms_tramite.tramite ASC", 
    {
        type: QueryTypes.SELECT
      }, (err, rows) => {
        console.log(rows)
        if (err) throw err;
        console.log(err)
    }).then(function (result){
        if(result.length >0){
            res.json(result);
        }else{
            res.json('Usuario o clave incorrecto')
        }       
    });     
    });


module.exports = router;