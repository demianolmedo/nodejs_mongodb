const express = require('express');
const router = express.Router();

router.get('/:numero/:msg', (req,res)=>{

    var smpp = require('smpp-34');
    var session = smpp.connect('smpp://10.223.1.51:5000')
    session['bind_transmitter']({
        auto_enquire_link_period: 1,
        system_id:  "infoe104",
        password: "vn9sh5cx",
        addr_ton: 2,
        addr_npi: 1,
        dest_addr_ton: 2,
        dest_addr_npi: 1
    }, function(pdu) {
        if (pdu.command_status ==0){
            //console.log(req.params.numero)       
            
             for (let i = 0; i < Math.ceil(req.params.msg.length/160); i++) {
                session.submit_sm({
                    source_addr_ton: 0,
                    source_addr_npi: 1,
                    dest_addr_ton: 2,
                    dest_addr_npi: 1,
                    data_coding: 3,
                    source_addr: '104',
                    destination_addr: req.params.numero,
                    short_message: req.params.msg.substr(i*159, ((i+1)*159))
                }, function(pdu){
                    if(pdu.command_status == 0) {
                        console.log('envio exitoso')
                    } else {
                        console.log('Error al enviar: ' + pdu_command_status)
                    }
                }
                )
                console.log(req.params.msg.substr(i*160, (i+1)*160))
            }    
        }
    }
    )

    
    
    session.on('connect', () => {
        console.log('Sms Online')
    })
    
    
    session.on('close', () => {
        console.log('Conecction lost')
    })

    session.on('error', (err) => {
        console.log(err)
    })
    //session.close()
});

module.exports = router;