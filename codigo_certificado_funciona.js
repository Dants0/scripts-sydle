if(_object.sendAdjustmentBoard){
    _pin.adjustmentRequestFor = "Diretoria CSC";
}

if(_object && _object.signedFiles){
    let signText = ["Assinado por {{user}}",
    "E-mail: " + _user.email,
    "Data: {{date}}",
    "{{CN}}"];
                
    let signedFile = labcmi.utils.fileSignature({
            "files" : _pin.formReceiptsSignature.document,
            "x" : 40,
            "y" : 755,
            "width" : 200,
            "height" : 100,
            "certificateObj" : _object.certificate,
            "text": signText,
            "font": 7
        });
        if(signedFile) {
             try{
               _pin.documentSign = signedFile;
            } catch(e){
                    throw new Error("Ocorreu um erro ao atribuir a assinatura!");
                }
    }
}

//envio de notificacao
if(_object && _object.signedFiles){
const CLASS_NOTIFICATION_CONFIG = "5ce5ab8e150308416d021b1e";

const link = _pin.taskLink + _object._class._id + "/" + _object._id;

const title = "Assinatura de Recibo(s) - Processo finalizado";

let templateID = "6536adf719ae24339dc37d88";

let params = {
    "ticket": _object._pin.ticket.code,
};

let body = labcmi.HTMLTemplate.renderHTML({view: params, id: templateID}).html.getContentAsText('UTF-8');

if(_pin._requestor.name && _pin._requestor.email){
    
        _utils.getMethod('_classId', CLASS_NOTIFICATION_CONFIG , 'send')({
            "identifier": "notifications",
            "object": {
                "to": _pin._requestor.email,
                "body": body,
                "title": title,
                "file": _pin.documentSign,
            }
        });
    
}
}


//envio de notificacao de cancelamento
if(_object && _object.cancelOrder){
const CLASS_NOTIFICATION_CONFIG1 = "5ce5ab8e150308416d021b1e";

const title1 = "Assinatura de Recibo(s) - Solicitação Cancelada";

let templateID1 = "653800172757e546614853b8";

let params1 = {
	"ticket": _object._pin.ticket.code,
	"motivo": _object.cancelReason,
};

let body1 = labcmi.HTMLTemplate.renderHTML({view: params1, id: templateID1}).html.getContentAsText('UTF-8');

if(_pin._requestor.name && _pin._requestor.email){
	
		_utils.getMethod('_classId', CLASS_NOTIFICATION_CONFIG1 , 'send')({
			"identifier": "notifications",
			"object": {
				"to": _pin._requestor.email,
				"body": body1,
				"title": title1,
			}
		});
	
	}
}
