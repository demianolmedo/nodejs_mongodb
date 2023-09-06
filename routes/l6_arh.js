const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var path = require('path');

const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

const mysqlConnection = require('../config/atc_APPLPORDB');


// create application/json parser
var jsonParser = bodyParser.json()


router.get('/', (req,res)=>{
    mysqlConnection.sequelize.query("SELECT APPLPORDB.L6_PLATAFORMA.tipo,    APPLPORDB.L6_PLATAFORMA.id_auto,    APPLPORDB.L6_PLATAFORMA.plataforma    FROM    APPLPORDB.L6_PLATAFORMA    WHERE    L6_PLATAFORMA.estado = '1' AND    L6_PLATAFORMA.tipo IN ('CC', 'ADM', 'MC')    ORDER BY    APPLPORDB.L6_PLATAFORMA.tipo ASC,    APPLPORDB.L6_PLATAFORMA.plataforma ASC", 
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