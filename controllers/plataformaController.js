const {PlataformaModel, ResultModel, ReasonModel, FormularioModel} = require("../models/Plataforma")


exports.crearPlataforma = async (req,res) => {
    try {
        let plataforma

        //creamos nuestra plataforma

        plataforma = new PlataformaModel(req.body);  
        await plataforma.save();        
        res.send(plataforma);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.obtenerPlataforma = async (req,res) => {
    try {
        
        const plataforma = await PlataformaModel.find().populate( { path : 'consultas' , select: 'n_reason result posee_formulario formulario', populate : [ {path : 'result' , select: 'n_result'}, {path : 'formulario' , select: 'n_formulario tipo contenido'} ] } ).populate( { path : 'requerimientos' , select: 'n_reason result posee_formulario formulario', populate : [ {path : 'result' , select: 'n_result'}, {path : 'formulario' , select: 'n_formulario tipo contenido'} ] } ).populate( { path : 'problemas' , select: 'n_reason result posee_formulario formulario', populate : [ {path : 'result' , select: 'n_result'}, {path : 'formulario' , select: 'n_formulario tipo contenido'} ] } );
        res.json(plataforma)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.buscarPlataforma = async (req,res) => {
    try {
        
        let plataforma = await PlataformaModel.findById(req.params.id).populate( { path : 'consultas' , select: 'n_reason result posee_formulario formulario' } ).populate( { path : 'requerimientos' , select: 'n_reason result posee_formulario formulario' } ).populate( { path : 'problemas' , select: 'n_reason result posee_formulario formulario' } );

        if(!plataforma){
            res.status(400).json({ msg: 'No existe la plataforma' })
        }

        res.json(plataforma)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.actualizarPlataforma = async (req,res) => {
    try {        
        const [{ consultas, requerimientos, problemas, userUpdate, l6_plataforma }] = req.body;
        let plataforma = await PlataformaModel.findById(req.params.id);

        if(!plataforma){
            res.status(400).json({ msg: 'No existe la plataforma' })
        }            
        plataforma = await PlataformaModel.findByIdAndUpdate({ _id: req.params.id }, { consultas: consultas, requerimientos: requerimientos, problemas: problemas, userUpdate: userUpdate, l6_plataforma: l6_plataforma} , { new: true } );
        res.json(plataforma.consultas)        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}