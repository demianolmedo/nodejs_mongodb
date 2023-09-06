const {PlataformaModel, ResultModel, ReasonModel, FormularioModel} = require("../models/Plataforma")
const mongoose = require("mongoose");

exports.crearReason= async (req,res) => {
    try {
        let reason

        //creamos nuestra plataforma

        reason = new ReasonModel(req.body);
        
        await reason.save();
        res.send(reason);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.obtenerReason = async (req,res) => {
    try {
        
        const reason = await ReasonModel.find().populate('formulario', 'n_formulario tipo contenido');
        res.json(reason)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.buscarReason = async (req,res) => {
    try {
        
        //let plataforma = await PlataformaModel.findOne(req.params.plataforma).distinct("consultas").populate( { path : 'consultas' , select: 'n_reason result posee_formulario formulario', populate : [ {path : 'result' , select: 'n_result'}, {path : 'formulario' , select: 'n_formulario tipo contenido'} ] } )
        
        let formulario_r = await ReasonModel.aggregate([
            { $match : { _id : new mongoose.Types.ObjectId(req.params.id)} },
            { $unwind : '$formulario' },
            
            {
                $lookup:
                  {
                    from: "formularios",
                    localField: "formulario",
                    foreignField: "_id",
                    as: "forms"
                  }
             },
             {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$forms", 0 ] }, "$$ROOT" ] } }
             },
             
             { $project: { forms: 0} },

             


             //{ $project : { _id : 0, 'consultas.n_reason' : 1, 'consultas.posee_formulario' : 1 } },
          ])

        //if(plataforma.length<1){
        //    res.status(400).json({ msg: 'No existe informacion para la pataforma: '+req.params.plataforma+' outcome: '+req.params.outcome })
        //}

        //console.log(plataforma)

        res.json(formulario_r)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.actualizarReason = async (req,res) => {
    try {
        
        const { n_reason, posee_formulario, formulario, userCreate, userUpdate } = req.body;
        let reason = await ReasonModel.findById(req.params.id);

        if(!reason){
            res.status(400).json({ msg: 'No existe el reason' })
        }

        reason.n_reason = n_reason;
        reason.posee_formulario = posee_formulario;
        reason.formulario = formulario;
        reason.userCreate = userCreate;
        reason.userUpdate = userUpdate;

        if(Object.keys(req.body).length == 0) {reason.posee_formulario="NO"} else (reason.posee_formulario="SI")

        result = await ReasonModel.findByIdAndUpdate({ _id: req.params.id }, { formulario: req.body, posee_formulario: reason.posee_formulario} , { new: true } );
        res.json(reason)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}