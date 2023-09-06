const express = require('express');
const router = express.Router();
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var path = require('path');

const Sequelize = require("sequelize");
const { QueryTypes } = require('sequelize');

const mysqlConnection = require('../config/mariadb');


// create application/json parser
var jsonParser = bodyParser.json()



router.get('/', (req,res)=>{
    mysqlConnection.query('select * from USERS', (err,rows,fields) => {
        if(!err){
            res.json(rows);
        }else{
            console.log(err);
        }
    })
});

router.post('/singin', jsonParser, function(req,res)  {
    const { userName, pass } = req.body;
    
    mysqlConnection.sequelize.query("SELECT U.ENCRYPTED_USER_PASSWORD,     U.USER_ID,    U.USER_NAME,    U.DESCRIPTION,    U.EMAIL_ADDRESS,    U.LOGIN_CMS,    E.EMPLOYEE_NUM,    E.L1_ORGANIZACION,    E.L2_DEPARTAMENTO,    E.L3_AREA,    E.L4_GERENCIA,    E.L5_UNIDAD,    E.L6_PLATAFORMA,    E.L7_CARGO,  A.area,  P.plataforma as PLATAFORMA,  L.unidad AS UNIDAD,  E.IDREL_SUPERVISOR,    SUPERVISOR.DESCRIPTION AS NOM_SUPERVISOR,    SUPERVISOR.EMAIL_ADDRESS AS EMAIL_SUPERVISOR,    E.IDREL_COORDINADOR,    COORDINADOR.DESCRIPTION AS NOM_COORDINADOR,    COORDINADOR.EMAIL_ADDRESS AS EMAIL_COORDINADOR,    JEFE_SUP.USER_ID AS ID_JEFE_SUP,    JEFE_SUP.DESCRIPTION AS NOM_JEFE_SUP,    JEFE_SUP.EMAIL_ADDRESS AS EMAIL_JEFE_SUP, E.AP_PICTURE1    FROM APPLPORDB.USERS U    INNER JOIN EMPLOYEES E ON U.USER_ID=E.EMPLOYEE_ID    INNER JOIN APPLPORDB.L6_PLATAFORMA P ON P.id_auto=E.L6_PLATAFORMA  INNER JOIN APPLPORDB.L3_AREA A ON A.id_auto=E.L3_AREA INNER JOIN APPLPORDB.L5_UNIDAD L ON L.id_auto=E.L5_UNIDAD LEFT JOIN APPLPORDB.USERS SUPERVISOR ON SUPERVISOR.USER_ID=E.IDREL_SUPERVISOR    LEFT JOIN APPLPORDB.USERS COORDINADOR ON COORDINADOR.USER_ID=E.IDREL_COORDINADOR    LEFT JOIN APPLPORDB.EMPLOYEES EMPSUPERVISOR ON EMPSUPERVISOR.EMPLOYEE_ID=SUPERVISOR.USER_ID    LEFT JOIN APPLPORDB.USERS JEFE_SUP ON JEFE_SUP.USER_ID=EMPSUPERVISOR.IDREL_SUPERVISOR    WHERE (    (U.END_DATE = '0000-00-00 00:00:00')    AND ((U.BLOCKED_ACCESS > NOW()) or (U.BLOCKED_ACCESS = ''))    AND (U.USER_NAME=? AND  U.ENCRYPTED_USER_PASSWORD=MD5(?))    )",
    {
        replacements: [userName, pass],
        type: QueryTypes.SELECT
      }, (err, rows) => {
    //console.log(rows)
    if (err) throw err;
    console.log(err)
}).then(function (result){
    if(result.length >0){
        let data = result[0];
        const token = jwt.sign( {data},'demian',{ expiresIn: '4h' } );
        res.json({token});
    }else{
        res.json('Usuario o clave incorrecto')
    }
   
});

    
    

});

router.post('/test', verifyToken, (req,res) => {
   
    const datatoken = JSON.parse(req.data.data);
    if(datatoken.plataforma==='TDI'){
        res.json('Informacion secreta para plataforma TDI '+ datatoken.USER_NAME);
    }else{
        res.json('Informacion para otra plataforma '+ datatoken.USER_NAME );
    }        
 
})

function verifyToken(req,res, next){

    if(!req.headers.authorization) return res.status(401).json('Token Vacio');

    const token = req.headers.authorization.substr(7);
    if(token!==''){
       // const content = jwt.verify(token,'demian', (err, result) => { return res.status(200).send({ err: err, result: result, }); });
        const content = jwt.verify(token,'demian', function (err, result) {
            if (err) {
                req.data = res.status(401).json('Token No Valido');
            }
                req.data = result;
                next();
          });
        
    }else{
        res.status(401).json('Token vacio');
    }
}

module.exports = router;