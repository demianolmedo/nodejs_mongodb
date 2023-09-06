const {PlataformaModel, ResultModel, ReasonModel, FormularioModel} = require("../models/Plataforma")

exports.crearFormulario= async (req,res) => {
    try {
        let formulario

        //creamos nuestra plataforma

        formulario = new FormularioModel(req.body);
        
        await formulario.save();
        res.send(formulario);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.obtenerFormulario = async (req,res) => {
    try {
        
        const formulario = await FormularioModel.find();
        res.json(formulario)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.buscarFormulario = async (req,res) => {
    try {
        
        let formulario = await FormularioModel.findById(req.params.id);

        if(!formulario){
            res.status(400).json({ msg: 'No existe el formulario' })
        }

        res.json(formulario)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.actualizarFormulario = async (req,res) => {
    try {
        
        const { n_formulario, tipo, contenido, userCreate, userUpdate, obligatorio } = req.body;
        let formulario = await FormularioModel.findById(req.params.id);

        if(!formulario){
            res.status(400).json({ msg: 'No existe el formulario' })
        }

        formulario.n_formulario = n_formulario;
        formulario.tipo = tipo;
        formulario.obligatorio = obligatorio;
        formulario.contenido = contenido;
        formulario.userCreate = userCreate;
        formulario.userUpdate = userUpdate;

        formulario = await FormularioModel.findByIdAndUpdate({ _id: req.params.id }, formulario, { new: true } );
        res.json(formulario)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}