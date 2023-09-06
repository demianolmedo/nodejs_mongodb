const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');



const { QueryTypes } = require('sequelize');

const mysqlConnection = require('../config/atc_datainfos');


// create application/json parser
var jsonParser = bodyParser.json()


router.get('/', (req,res)=>{
    mysqlConnection.sequelize.query("select `instructivos_atc`.`id_instructivo` AS `id_instructivo`,`instructivos_atc`.`fech_publica` AS `fech_publica`,`instructivos_atc`.`correlativo` AS `correlativo`,`instructivos_atc`.`titulo` AS `titulo`,`instructivos_atc`.`puntos_destacados` AS `puntos_destacados`,`area_implicada`.`desc_area` AS `Area`,`instructivos_atc`.`fech_ini` AS `fech_ini`,`instructivos_atc`.`fech_fin` AS `fech_fin`,`instructivos_atc`.`anexos` AS `anexos`,`instructivos_atc`.`palabras_clave` AS `palabras_clave`,`instructivos_atc`.`tema` AS `tema`,`instructivos_atc`.`documento_relacionado` AS `documento_relacionado`,`vigencia`.`vigencia` AS `vigencia`,`estado`.`desc_estado` AS `desc_estado` from (((`instructivos_atc` join `area_implicada` on((`instructivos_atc`.`id_area` = `area_implicada`.`id_area`))) join `estado` on((`instructivos_atc`.`id_estado` = `estado`.`id_estado`))) join `vigencia` on((`instructivos_atc`.`id_vigencia` = `vigencia`.`id_vigencia`))) WHERE DESC_ESTADO = 'VIGENTE' ORDER BY id_instructivo DESC", 
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