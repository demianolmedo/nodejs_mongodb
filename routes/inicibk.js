const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var path = require('path');

const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

const mysqlConnection = require('../config/atc_iniciobk');


// create application/json parser
var jsonParser = bodyParser.json()


router.get('/', (req,res)=>{
    var fechaActual = new Date();
    var diaActual = fechaActual.getDay();
    var mesActual = fechaActual.getMonth() + 1;
    //console.log(fechaActual.getDate() + " " + mesActual );

    mysqlConnection.sequelize.query("SELECT tbl_fondos.fondo, tbl_eventos.tipo FROM tbl_eventos INNER JOIN tbl_fondos ON tbl_eventos.id_auto = tbl_fondos.id_rel WHERE tbl_eventos.dia_ini <= '"+fechaActual.getDate()+"' AND tbl_eventos.mes_ini = '"+mesActual+"' AND tbl_eventos.dia_fin >= '"+fechaActual.getDate()+"' AND tbl_eventos.mes_fin = '"+mesActual+"' ORDER BY RAND() LIMIT 1", 
    {
        type: QueryTypes.SELECT
      }, (err, rows) => {
        console.log(rows)
        if (err) throw err;
        console.log(err)
    }).then(function (result){
        if(result.length >0){
            res.json(result);
            // Crear un objeto de fecha


        }else{
            res.json('Usuario o clave incorrecto')
        }       
    });     
    });


module.exports = router;