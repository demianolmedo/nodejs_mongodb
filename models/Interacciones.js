const mongoose = require('mongoose');

const InteraccionesSchema = mongoose.Schema(
    {
        instancias: [{            
            instancia: { type:String, require: true}, 
            falla_aplicaciones: { type:[String], default:0 },
            registros: [{
                plataforma: { type:String, default:0},
                outcome: { type:String, default:0},
                result: { type:String, default:0},
                reason: { type:String, default:0},
                formulario: { type : Array , default : [] },
                fecha_fin_interaccion: { type:Date, default:Date.now}
            }],
            fecha_inicio_interaccion: { type:Date, default:Date.now},
            webservice: { type:String, require: true}
        }],
        telefono: { type:Number, require: true },
        agente_id: { type:String, require: true },
        agente_cms: { type:String, require: true },
        agente_nombre: { type:String, require: true },
        area: { type:String, require: true },
        plataforma: { type:String, require: true },
        unidad: { type:String, require: true },
        avaya_id: { type:String, default : "ND" }        
    },
    {
        timestamps: true
    }
);
const InteraccionesModel = mongoose.model('interacciones', InteraccionesSchema);

module.exports = InteraccionesModel