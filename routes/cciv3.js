const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var path = require('path');

const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

const mysqlConnection = require('../config/atc_cciv3');


// create application/json parser
var jsonParser = bodyParser.json()


router.get('/', (req,res)=>{
    mysqlConnection.sequelize.query("SELECT co.descripcion, rr.* FROM tbl_contenido_abm AS co INNER JOIN (SELECT s.servicio, c.titulo, c.fecha_creado, b.* FROM tbl_servicios AS s INNER JOIN tbl_contenido AS c ON s.id_ser = c.id_ser INNER JOIN (SELECT  id_cont, id_ser, MAX(id_cont_abm) AS ultimo, estado FROM tbl_contenido_abm where estado = '1' GROUP BY id_cont, id_ser, estado ) as b ON c.id_cont = b.id_cont WHERE c.estado = '1' AND s.estado='1') AS rr  ON co.id_cont_abm = rr.ultimo ORDER BY servicio", 
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