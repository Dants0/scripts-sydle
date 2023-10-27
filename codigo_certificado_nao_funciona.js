if(_object && _object.formMaterialNF.document){
    let signText = ["Assinado por {{user}}",
    "E-mail: " + _user.email,
    "Data: {{date}}",
    "{{CN}}"];
                
    let signedFile = labcmi.utils.fileSignature({
            "files" : _pin.formMaterialNF.document,
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
               _pin.formMaterialNF.document = signedFile;
            } catch(e){
                    throw new Error("Ocorreu um erro ao atribuir a assinatura!");
                }
    }
}

//envio de notificacao
const documentSigned = _object.formMaterialNF.document;

if(_object && documentSigned){
const CLASS_NOTIFICATION_CONFIG = "5ce5ab8e150308416d021b1e";

const link = _pin.taskLink + _object._class._id + "/" + _object._id;

const title = "Assinatura de Nota Fiscal - Processo finalizado";

let templateID = "653a6ccc60f2c154b7dc78a9";

const params = {
    "pessoaNome": _object.formMaterialNF.requester.name
}


let body = labcmi.HTMLTemplate.renderHTML({view: params, id: templateID}).html.getContentAsText('UTF-8');

if(_pin._requestor.name && _pin._requestor.email){
    
        _utils.getMethod('_classId', CLASS_NOTIFICATION_CONFIG , 'send')({
            "identifier": "notifications",
            "object": {
                "to": _pin._requestor.email,
                "body": body,
                "title": title,
                "file": documentSigned,
            }
        });
    
}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

_object._executor = _pin._requestor;
_pin.applicant = _pin._requestor;

if (_pin && _pin.solicitarAjuste){
    const AGUARDANDO_AJUSTE_SOLICITANTE = "653266e81230e016cd12a27a";
    _pin.processStage = {_id: AGUARDANDO_AJUSTE_SOLICITANTE};
}
//notificacao ajuste
if(_object.ajuste){

const CLASS_NOTIFICATION_CONFIG = "5ce5ab8e150308416d021b1e";

const link = _pin.taskLink + _object._class._id + "/" + _object._id;

const title = "Assinatura de Nota Fiscal - Processo pendente de Ajuste";

let templateID = "653a6ccc60f2c154b7dc78a9";

let params = {
    "pessoaNome": _object.formMaterialNF.requester.name,
    "ticket": _object._pin.ticket.code,
	"link1":"<a href=" + link + ">link</a>",
};

let body = labcmi.HTMLTemplate.renderHTML({view: params, id: templateID}).html.getContentAsText('UTF-8');

if(_pin._requestor.name && _pin._requestor.email){
    
        _utils.getMethod('_classId', CLASS_NOTIFICATION_CONFIG , 'send')({
            "identifier": "notifications",
            "object": {
                "to": _pin._requestor.email,
                "body": body,
                "title": title,
            }
        });
    
}
}