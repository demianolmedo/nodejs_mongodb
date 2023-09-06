
const express = require('express');
const conectarDB = require('./config/db');





const bodyParser = require('body-parser');

const cors = require('cors');

const http = require('http');
const { application } = require('express');
//application.use(bodyParser.urlencoded({extended: false}));
//application.use(bodyParser.json());
//application.use(cors());




//Creamos el servidor
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
//Conectamos a la BD MONGODB
conectarDB();

app.use('/api/marcaciones', require('./routes/marcaciones'));
app.use('/api/marcaciones2', require('./routes/marcaciones2'));


app.use('/api/imagenbk', require('./routes/inicibk'));

app.use('/api/plataforma', require('./routes/plataforma'));
app.use('/api/outcome', require('./routes/outcome'));
app.use('/api/result', require('./routes/result'));
app.use('/api/reason', require('./routes/reason'));
app.use('/api/formulario', require('./routes/formulario'));

app.use('/api/interacciones', require('./routes/interacciones'));

app.use('/user', require('./routes/user'));

app.use('/api/multicentros', require('./routes/multicentros'));

app.use('/api/datainfos', require('./routes/datainfos'));

app.use('/api/cciv3', require('./routes/cciv3'));

app.use('/api/bitacoras', require('./routes/bitacoras'));

app.use('/api/atc_menu', require('./routes/atc_menu'));

app.use('/api/registros', require('./routes/registros'));

app.use('/api/l6', require('./routes/l6_arh'));

app.use('/api/sms', require('./routes/sms'));

app.use('/api/smpp', require('./routes/smpp'));



//Definimos nueva ruta principal
/* app.get('/', (req,res) => {
    res.send('Hola mundo');-
}) */

const port = process.env.PORT || 3200;

const server = http.createServer(app);

server.listen(port);