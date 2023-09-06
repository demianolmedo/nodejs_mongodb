const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var path = require('path');

const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

const mysqlConnection = require('../config/atc_bitacoras');


// create application/json parser
var jsonParser = bodyParser.json()


router.get('/', (req,res)=>{
    mysqlConnection.sequelize.query("SELECT 'EVENTOS MASIVOS CONFIRMADOS' AS tipo, problemastbl.tipologia, problemastbl.ticket,DATE(problemastbl.fecha_reporte) AS fecha_rep,problemastbl.nombre_tipologia As evento,problemastbl.servicio, APPLPORDB.L2_DEPARTAMENTO.departamento AS ciudad, problemastbl.prioridad, problemastbl.estado, problemastbl.ubicacion, problemastbl.descripcion FROM problemastbl LEFT JOIN APPLPORDB.L2_DEPARTAMENTO ON problemastbl.ciudad=APPLPORDB.L2_DEPARTAMENTO.id_auto  WHERE  problemastbl.tipo='CONFIRMADO' AND  problemastbl.estado IN(0,3) UNION SELECT 'EVENTOS COMERCIALES PENDIENTES' AS tipo, problemas_comercialtbl.tipologia, problemas_comercialtbl.ticket,DATE(problemas_comercialtbl.fecha_reporte) AS fecha_rep, problemas_comercialtbl.nombre_tipologia AS evento,problemas_comercialtbl.servicio, APPLPORDB.L2_DEPARTAMENTO.departamento AS ciudad, problemas_comercialtbl.prioridad, problemas_comercialtbl.estado, problemas_comercialtbl.bitacora_ref, problemas_comercialtbl.descripcion FROM problemas_comercialtbl LEFT JOIN APPLPORDB.L2_DEPARTAMENTO ON problemas_comercialtbl.ciudad=APPLPORDB.L2_DEPARTAMENTO.id_auto  WHERE problemas_comercialtbl.tipo='CONFIRMADO' AND problemas_comercialtbl.estado IN(0,3) UNION SELECT 'EVENTOS MASIVOS SIN CONFIRMAR' AS tipo, problemastbl.tipologia, problemastbl.ticket, DATE(problemastbl.fecha_reporte) AS fecha_rep, problemastbl.nombre_tipologia AS evento, problemastbl.servicio, APPLPORDB.L2_DEPARTAMENTO.departamento AS ciudad, problemastbl.prioridad, problemastbl.estado, problemastbl.ubicacion, problemastbl.descripcion FROM problemastbl LEFT JOIN APPLPORDB.L2_DEPARTAMENTO ON problemastbl.ciudad=APPLPORDB.L2_DEPARTAMENTO.id_auto  WHERE problemastbl.tipo='SIN CONFIRMAR' AND problemastbl.estado IN(0,3) UNION SELECT 'EVENTOS EN APLICACIONES EN ESTADO PENDIENTE' AS tipo, '' AS tipologia, problemas_aplicacionestbl.ticket, CONCAT_WS(' ',DATE(problemas_aplicacionestbl.fecha_reporte),hora_reporte) AS fecha_rep, problemas_aplicacionestbl.nombre_evento AS evento, bdreseteos.aplicaciones.nombre AS servicio, APPLPORDB.L2_DEPARTAMENTO.departamento AS ciudad, problemas_aplicacionestbl.prioridad, problemas_aplicacionestbl.estado, '' AS ubicacion,  problemas_aplicacionestbl.descripcion FROM problemas_aplicacionestbl LEFT JOIN APPLPORDB.L2_DEPARTAMENTO ON problemas_aplicacionestbl.ciudades=APPLPORDB.L2_DEPARTAMENTO.id_auto LEFT JOIN bdreseteos.aplicaciones ON problemas_aplicacionestbl.aplicacion=bdreseteos.aplicaciones.id WHERE problemas_aplicacionestbl.estado=0 UNION SELECT 'CONTINGENCIA ACTIVA' AS tipo, '' AS tipologia, '' AS ticket, fecha_registro AS fecha_rep, '' as evento, plataforma AS servicio, '' AS ciudad, '' AS prioridad, '' AS estado, '' AS ubicacion, descripcion FROM contingenciastbl WHERE activar='S' UNION SELECT 'BAJA SISTEMAS' AS tipo, '' AS tipologia, '' AS ticket, CONCAT_WS(' ',fecha_inicio,hora_inicio) AS fecha_rep, '' as evento, aplicacion AS servicio, '' AS ciudad, '' AS prioridad, '' AS estado, '' AS ubicacion, observaciones AS descripcion FROM sistemas_bajatbl WHERE vigente='S' UNION SELECT 'BAJA SISTEMAS' AS tipo, '' AS tipologia, '' AS ticket, CONCAT_WS(' ',fecha_corte,hora_inicio) AS fecha_rep, 'CORTE PROGRAMADO' as evento, '' AS servicio, '' AS ciudad, '' AS prioridad, '' AS estado, '' AS ubicacion, descripcion AS descripcion FROM cortes_programadostbl WHERE vigente='S'", 
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
            res.json('Sin Informacion')
        }       
    });     
    });


module.exports = router;