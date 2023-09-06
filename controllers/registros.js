const InteraccionesModel = require("../models/Interacciones")



        

exports.buscarRegistros = async (req,res) => {
    function sumarDias(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
      }
      var d = new Date();
    try {
        
        const interacciones = await InteraccionesModel.aggregate([
            //{"$instancias.instancia": { $gt: sumarDias(d, -60) }},
            //{ $match : { createdAt: { $gt: sumarDias(d, -31) }} },
            {$match:{
                $and:[                  
                    {createdAt: { $gt: sumarDias(d, -31) }},
                    {"instancias.instancia":req.params.instancia}
                    ]}
            },
            { $unwind: "$instancias" },
            { $unwind: {
                path: "$instancias.registros",
                preserveNullAndEmptyArrays: true
                }
            },
            {      
                $project: {
                          instancia: "$instancias.instancia",
                          webservice:"$instancias.webservice",
                          fecha_inicio_interaccion: '$instancias.fecha_inicio_interaccion',
                          //registros:"$instancias.registros",
                          platafor:"$instancias.registros.plataforma",
                          outcome:"$instancias.registros.outcome",
                          result:"$instancias.registros.result",
                          reason:"$instancias.registros.reason",
                          formulario:"$instancias.registros.formulario",
                          telefono:1,
                          agente_id: 1,
                          agente_cms: 1,
                          agente_nombre: 1,
                          area: 1,
                          plataforma: 1,
                          unidad: 1,
                          createdAt: 1,
                          updatedAt: 1
                          }
            }
            
        ]);
        res.json(interacciones)
        //console.log(sumarDias(d, -60));
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}



exports.buscarBusqueda = async (req,res) => {
    try {

        const { campo, fechaDesde, fechaHasta, busqueda } = req.body;
        //console.log(req.body.campo)

        if (campo == 'instancia') {
            const interacciones = await InteraccionesModel.aggregate([
    
                {$match:{
                    $and:[                  
                        {createdAt: { $gte: new Date(fechaDesde) }},
                        {createdAt: { $lte: new Date(fechaHasta) }},
                        {"instancia":busqueda}
                        ]}
                },
    
                { $unwind: "$instancias" },
                { $unwind: {
                    path: "$instancias.registros",
                    preserveNullAndEmptyArrays: true
                    }
                },
                {      
                    $project: {
                              instancia: "$instancias.instancia",
                              webservice:"$instancias.webservice",
                              fecha_inicio_interaccion: '$instancias.fecha_inicio_interaccion',
                              //registros:"$instancias.registros",
                              platafor:"$instancias.registros.plataforma",
                              outcome:"$instancias.registros.outcome",
                              result:"$instancias.registros.result",
                              reason:"$instancias.registros.reason",
                              formulario:"$instancias.registros.formulario",
                              telefono:1,
                              agente_id: 1,
                              agente_cms: 1,
                              agente_nombre: 1,
                              area: 1,
                              plataforma: 1,
                              unidad: 1,
                              createdAt: 1,
                              updatedAt: 1
                              }
                }            
                ]);
                res.json(interacciones)
        }


        if (campo == 'telefono') {
            const interacciones = await InteraccionesModel.aggregate([
                //{"$instancias.instancia": { $gt: sumarDias(d, -60) }},
                //{ $match : { createdAt: { $gt: sumarDias(d, -31) }} }
    
                {$match:{
                    $and:[                  
                        {createdAt: { $gte: new Date(fechaDesde) }},
                        {createdAt: { $lte: new Date(fechaHasta) }},
                        {"telefono":parseInt(busqueda)}
                        ]}
                },
    
                { $unwind: "$instancias" },
                { $unwind: {
                    path: "$instancias.registros",
                    preserveNullAndEmptyArrays: true
                    }
                },
                {      
                    $project: {
                              instancia: "$instancias.instancia",
                              webservice:"$instancias.webservice",
                              fecha_inicio_interaccion: '$instancias.fecha_inicio_interaccion',
                              //registros:"$instancias.registros",
                              platafor:"$instancias.registros.plataforma",
                              outcome:"$instancias.registros.outcome",
                              result:"$instancias.registros.result",
                              reason:"$instancias.registros.reason",
                              formulario:"$instancias.registros.formulario",
                              telefono:1,
                              agente_id: 1,
                              agente_cms: 1,
                              agente_nombre: 1,
                              area: 1,
                              plataforma: 1,
                              unidad: 1,
                              createdAt: 1,
                              updatedAt: 1
                              }
                }            
                ]);
                res.json(interacciones)
        }


        if (campo == 'agente_id') {
            const interacciones = await InteraccionesModel.aggregate([
                //{"$instancias.instancia": { $gt: sumarDias(d, -60) }},
                //{ $match : { createdAt: { $gt: sumarDias(d, -31) }} }
    
                {$match:{
                    $and:[                  
                        {createdAt: { $gte: new Date(fechaDesde) }},
                        {createdAt: { $lte: new Date(fechaHasta) }},
                        {"agente_id":busqueda}
                        ]}
                },
    
                { $unwind: "$instancias" },
                { $unwind: {
                    path: "$instancias.registros",
                    preserveNullAndEmptyArrays: true
                    }
                },
                {      
                    $project: {
                              instancia: "$instancias.instancia",
                              webservice:"$instancias.webservice",
                              fecha_inicio_interaccion: '$instancias.fecha_inicio_interaccion',
                              //registros:"$instancias.registros",
                              platafor:"$instancias.registros.plataforma",
                              outcome:"$instancias.registros.outcome",
                              result:"$instancias.registros.result",
                              reason:"$instancias.registros.reason",
                              formulario:"$instancias.registros.formulario",
                              telefono:1,
                              agente_id: 1,
                              agente_cms: 1,
                              agente_nombre: 1,
                              area: 1,
                              plataforma: 1,
                              unidad: 1,
                              createdAt: 1,
                              updatedAt: 1
                              }
                }            
                ]);
                res.json(interacciones)
        }


        if (campo == 'agente_nombre') {
            const interacciones = await InteraccionesModel.aggregate([
    
                {$match:{
                    $and:[                  
                        {createdAt: { $gte: new Date(fechaDesde) }},
                        {createdAt: { $lte: new Date(fechaHasta) }},
                        {"agente_nombre": { $regex: busqueda, $options: 'i' } }  
                        ]},
                        
                },
    
                { $unwind: "$instancias" },
                { $unwind: {
                    path: "$instancias.registros",
                    preserveNullAndEmptyArrays: true
                    }
                },
                {      
                    $project: {
                              instancia: "$instancias.instancia",
                              webservice:"$instancias.webservice",
                              fecha_inicio_interaccion: '$instancias.fecha_inicio_interaccion',
                              //registros:"$instancias.registros",
                              platafor:"$instancias.registros.plataforma",
                              outcome:"$instancias.registros.outcome",
                              result:"$instancias.registros.result",
                              reason:"$instancias.registros.reason",
                              formulario:"$instancias.registros.formulario",
                              telefono:1,
                              agente_id: 1,
                              agente_cms: 1,
                              agente_nombre: 1,
                              area: 1,
                              plataforma: 1,
                              unidad: 1,
                              createdAt: 1,
                              updatedAt: 1
                              }
                }            
                ]);
                res.json(interacciones)
        }


        if (campo == 'webservice') {
            const interacciones = await InteraccionesModel.aggregate([
    
                {$match:{
                    $and:[                  
                        {createdAt: { $gte: new Date(fechaDesde) }},
                        {createdAt: { $lte: new Date(fechaHasta) }},
                        {"instancias.webservice": { $regex: busqueda, $options: 'i' } }  
                        ]},
                        
                },
    
                { $unwind: "$instancias" },
                { $unwind: {
                    path: "$instancias.registros",
                    preserveNullAndEmptyArrays: true
                    }
                },
                {      
                    $project: {
                              instancia: "$instancias.instancia",
                              webservice:"$instancias.webservice",
                              fecha_inicio_interaccion: '$instancias.fecha_inicio_interaccion',
                              //registros:"$instancias.registros",
                              platafor:"$instancias.registros.plataforma",
                              outcome:"$instancias.registros.outcome",
                              result:"$instancias.registros.result",
                              reason:"$instancias.registros.reason",
                              formulario:"$instancias.registros.formulario",
                              telefono:1,
                              agente_id: 1,
                              agente_cms: 1,
                              agente_nombre: 1,
                              area: 1,
                              plataforma: 1,
                              unidad: 1,
                              createdAt: 1,
                              updatedAt: 1
                              }
                }            
                ]);
                res.json(interacciones)
        }



        
        

        //console.log(campo, fechaDesde, fechaHasta, busqueda );
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un Error')
    }
}




