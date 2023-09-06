const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var path = require('path');

const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

const mysqlConnection = require('../config/atc_menu');


// create application/json parser
var jsonParser = bodyParser.json()


router.get('/', (req,res)=>{
    mysqlConnection.sequelize.query("SELECT id, NOMBRE, REPLACE(REPLACE(REPLACE(CONTENIDO,'border=\"0\"','border=\"1\"'),'#ffffff','#000000'),' size=\"5\" face=\"Tahoma\"','') AS CONTENIDO, FECHA FROM opcionestbl where id=361 OR id=472", 
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