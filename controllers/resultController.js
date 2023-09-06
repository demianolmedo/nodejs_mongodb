const {PlataformaModel, ResultModel, ReasonModel, FormularioModel} = require("../models/Plataforma")

exports.crearResult= async (req,res) => {
    try {
        let result

        //creamos nuestra plataforma

        result = new ResultModel(req.body);
        
        await result.save();
        res.send(result);
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.obtenerResult = async (req,res) => {
    try {

        const result = await ResultModel.find();        
        res.json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.buscarResult = async (req,res) => {
    try {
        
        let result = await ResultModel.findById(req.params.id);  

        if(!result){
            res.status(400).json({ msg: 'No existe el Result' })
        }

        res.json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}

exports.actualizarResult = async (req,res) => {
    try {
        
        const { n_result, reason, userCreate, userUpdate } = req.body;
        let result = await ResultModel.findById(req.params.id);

        if(!result){
            res.status(400).json({ msg: 'No existe el result' })
        }

        result.n_result = n_result;
        result.reason = reason;
        result.userCreate = userCreate;
        result.userUpdate = userUpdate;

        result = await ResultModel.findByIdAndUpdate({ _id: req.params.id }, result, { new: true } );
        res.json(result)
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}