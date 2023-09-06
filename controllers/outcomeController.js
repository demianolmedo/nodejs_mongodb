const {PlataformaModel, ResultModel, ReasonModel, FormularioModel} = require("../models/Plataforma")



exports.buscarOutcome = async (req,res) => {
    try {
        
        //let plataforma = await PlataformaModel.findOne(req.params.plataforma).distinct("consultas").populate( { path : 'consultas' , select: 'n_reason result posee_formulario formulario', populate : [ {path : 'result' , select: 'n_result'}, {path : 'formulario' , select: 'n_formulario tipo contenido'} ] } )
        
        let outcome_r = await PlataformaModel.aggregate([
            { $match : { n_plataforma : req.params.plataforma} },
            { $unwind : '$'+req.params.outcome },
            
            {
                $lookup:
                  {
                    from: "reasons",
                    localField: req.params.outcome,
                    foreignField: "_id",
                    as: "outome"
                  }
             },
             {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$outome", 0 ] }, "$$ROOT" ] } }
             },
             //{ $project: { _id:1, n_plataforma:1, l6_plataforma:1, activo:1, n_outcome:req.params.outcome, result:1, n_reason:1, posee_formulario:1, formulario:1, id_reason: "$outome._id", reason_activo: "$outome.activo" } },
             //{ $project: { outome: 0} },

             {
                $lookup:
                  {
                    from: "results",
                    localField:"result",
                    foreignField: "_id",
                    as: "result"
                  }
             },
             {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$result", 0 ] }, "$$ROOT" ] } }
             },

             {
                $lookup:
                  {
                    from: "formularios",
                    localField:"formulario",
                    foreignField: "_id",
                    as: "formulario"
                  }
             },
             {
                $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$formulario", 0 ] }, "$$ROOT" ] } }
             },

             { $project: { n_result:1, _id:1, n_plataforma:1, l6_plataforma:1, activo:1, n_outcome:req.params.outcome, n_reason:1, posee_formulario:1, formulario:1, id_reason: "$outome._id", reason_activo: "$outome.activo", fecha_ini:1, fecha_fin:1, info:1} },

             


             //{ $project : { _id : 0, 'consultas.n_reason' : 1, 'consultas.posee_formulario' : 1 } },
          ])

        //if(plataforma.length<1){
        //    res.status(400).json({ msg: 'No existe informacion para la pataforma: '+req.params.plataforma+' outcome: '+req.params.outcome })
        //}

        //console.log(plataforma)

        res.json(outcome_r)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

