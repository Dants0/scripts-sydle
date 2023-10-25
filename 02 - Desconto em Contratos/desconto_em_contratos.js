const MessagesController = {
    withoutValueDiscount: 'Necessário informar o valor do desconto.',
    contractsUnder1YearError: 'Só é permitido descontar contratos com mais de um ano de vida.'
}

let desconto = _input.desconto


if(!desconto){
    throw MessagesController.withoutValueDiscount
}

const date = new Date()

if(date.getFullYear() - _object.dataDaVenda.getFullYear() < 1){
    throw MessagesController.contractsUnder1YearError
}

_object.valor = (_object.valor * (1-desconto/100)).toFixed(2)
_object.dataDeVencimento.setFullYear(_object.dataDeVencimento.getFullYear()+1)

comercialGuilhermeDantas.ContractGuilhermeDantas._update(_object)

_social._post._create({
    "objects": [_object],
    "user": _user,
    "text": "Desconto de " + desconto + "% dado por " + _user.name + "."
})