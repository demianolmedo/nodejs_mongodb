const InteraccionesModel = require("../models/Interacciones")

exports.crearInteracciones= async (req,res) => {
    try {
        let interacciones
        //creamos nuestra interaccion
        interacciones = new InteraccionesModel(req.body);        
        await interacciones.save(function(err,id) {
            console.log(id._id);
            res.json({"id_interaccion":id._id})
         });
        //res.send(interacciones);        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Errors')
    }
    //res.send(interacciones)
}

exports.actualizaLlamada= async (req,res) => {

    try {

        const { instancia, plataforma, outcome, result, reason, formulario, webservice } = req.body;
        let interacciones = await InteraccionesModel.findById(req.params.id);

        if(!interacciones) {
            res.status(404),json({ msg: 'No existe el producto' })
        }

        interacciones.instancias.instancia = instancia;
        interacciones.instancias.webservice = webservice

        interacciones = await InteraccionesModel.findOneAndUpdate(
            { _id: req.params.id}, 
            { $push: { instancias: {instancia: interacciones.instancias.instancia, plataforma: interacciones.instancias.plataforma, outcome: interacciones.instancias.outcome, result: interacciones.instancias.result, reason: interacciones.instancias.reason, formulario: interacciones.instancias.formulario,  webservice: interacciones.instancias.webservice}  }}, 
            { new: true}, 
            )
        res.json(interacciones);

    } catch (error) {
        console.log(error);
        //req.status(500).send('Hubo un error');
    }
}


exports.actualizaInteracciones= async (req,res) => {

    try {
        

        const { plataforma, outcome, result, reason, formulario } = req.body;


        interacciones = await InteraccionesModel.findOneAndUpdate(
            { 'instancias._id': req.params.id}, 
            { $push: 
                { 'instancias.$.registros':                     
                        {plataforma: plataforma, outcome: outcome, result: result, reason: reason, formulario: formulario }                      
                }
            }, 
            { new: true}, 
            )
        res.json(interacciones);

    } catch (error) {
        console.log(error);
        //req.status(500).send('Hubo un error');
    }
}


exports.obtenerInteracciones = async (req,res) => {
    try {
        
        const interacciones = await InteraccionesModel.find();
        res.json(interacciones)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}


exports.buscarInteracciones = async (req,res) => {
    try {
        
        let interacciones = await InteraccionesModel.findById(req.params.id);  

        if(!interacciones){
            res.status(400).json({ msg: 'No existe la interaccion' })
        }

        res.json(interacciones)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

