const MessageErrorController = {
    cnpj_null: "Favor, informar o número do CNPJ",
    cnpj_above_14_algarism: "CNPJ digitado possui mais de 14 algarismos."
}

function replacer(match, p1, p2, p3, p4, p5) {
    let result = ''
    result += p1 !== undefined ? p1 : ''
    result += p2 !== undefined ? '.' + p2 : '';
    result += p3 !== undefined ? '.' + p3 : '';
    result += p4 !== undefined ? '/' + p4 : '';
    result += p5 !== undefined ? '-' + p5 : '';
    return result;
}

function formatCNPJ(cnpj) {
    if (!cnpj) return MessageErrorController.cnpj_null

    cnpj = cnpj.replace(/\D/g, '')
    if (cnpj.length > 14) {
        throw MessageErrorController.cnpj_above_14_algarism
    }

    return cnpj.replace(/(\d{2})(\d{1,3})?(\d{1,3})?(\d{1,4})?(\d{1,2})?/, replacer);
}

function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') {
        return false
    }

    if (cnpj.length != 14) {
        return false
    }

    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999") {
        return false;
    }

    var length = cnpj.length - 2;
    var numbers = cnpj.substring(0, length);
    var digits = cnpj.substring(length);
    var sum = 0;
    var pos = length - 7;
    for (var i = length; i >= 1; i--) {
    sum += numbers.charAt(length - i) * pos--;
    if (pos < 2)
        pos = 9;
    }
    var result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(0)) {
        return false;
    }
    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (var j = length; j >= 1; j--) {
    sum += numbers.charAt(length - j) * pos--;
        if (pos < 2) {
        pos = 9;
        }
    }
    result = sum % 11 < 2 ? 0 : 11 - sum % 11;
    if (result != digits.charAt(1)) {
        return false;
    }

    return true;

}