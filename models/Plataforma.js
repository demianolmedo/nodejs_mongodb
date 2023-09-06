const mongoose = require('mongoose');

const PlataformaSchema = mongoose.Schema(
    {
        n_plataforma: { type:String, require: true },
        l6_plataforma: { type:[Number], default:0 }, 
        activo:  { type:String, default:"SI" },
        consultas: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'reason'
        }],
        requerimientos: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'reason'
        }],
        problemas: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'reason'
        }],
        userCreate: { type:String, default:"SI" },
        userUpdate: { type:String, default:"SI" }
    },
    {
        timestamps: true
    }
);
const PlataformaModel = mongoose.model('plataforma', PlataformaSchema)

const ReasonSchema = mongoose.Schema(
    {
        n_reason: { type:String, require: true },
        result:  {
            type:mongoose.Schema.Types.ObjectId,
            ref:'result'
        },
        posee_formulario: { type:String, default:"NO" },
        info: { type:String, default:"SIN INFO" },
        formulario: [{
            type:mongoose.Schema.Types.ObjectId,
            ref:'formulario'
        }],
        fecha_ini: { type:Date, default:Date.now },
        fecha_fin: { type:Date, default:"3000-01-01" },
        activo: { type:String, default:"SI" }
    }
);
const ReasonModel = mongoose.model('reason', ReasonSchema)

const ResultSchema = mongoose.Schema(
    {
        n_result: { type:String, require: true },
        userCreate: { type:String, default:"SI" },
        userUpdate: { type:String, default:"SI" }    
    },
    {
        timestamps: true
    }
);
const ResultModel = mongoose.model('result', ResultSchema)

const FormularioSchema = mongoose.Schema(
    {
        n_formulario: { type:String, require: true },
        tipo: { type:String, require: true },
        obligatorio: { type:String , require: true},
        contenido: { type:[String], default:[""] },
        userCreate: { type:String, default:"SI" },
        userUpdate: { type:String, default:"SI" }    
    },
    {
        timestamps: true
    }
);
const FormularioModel = mongoose.model('formulario', FormularioSchema)

module.exports = {PlataformaModel, ResultModel, ReasonModel, FormularioModel}