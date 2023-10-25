// Atenção: Conferir o identificador do seu campo CPF na árvore de expressões, dentro de _object.
if (_object.cPF && _object.cPF !== _oldObject.cPF) {               
    _object.cPF = formatCPF(_object.cPF);
}

/***** Funções principais ******/

function formatCPF(cpf) {
    if (!cpf) return '';

    cpf = cpf.replace(/\D/g, '');     // Remove todo caracter não numérico

    if (cpf.length > 11) {
        throw "CPF digitado possui mais de 11 algarismos.";
    }

    function replacer(match, p1, p2, p3, p4) {
        let result = '';
        result += p1 !== undefined ? p1 : '';
        result += p2 !== undefined ? '.' + p2 : '';
        result += p3 !== undefined ? '.' + p3 : '';
        result += p4 !== undefined ? '-' + p4 : '';
        return result;
    }

    return cpf.replace(/(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/, replacer);
}

// Atenção: Conferir o identificador do seu campo CPF na árvore de expressões, dentro de _object.
if (_object.cPF && !validateCPF(_object.cPF)) {
    throw "O CPF " + _object.cPF + " cadastrado não é válido";
}

/***** Funções principais ******/

function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');     // Remove todo caracter não numérico
    if (cpf.length != 11) {
        return false;
    }
    var rcpf1 = cpf.substring(0, 9);
    var rcpf2 = cpf.substring(9);
    var d1 = 0;
    for (var i = 0; i < 9; i++) {
        d1 += parseInt(rcpf1.substring(i, i + 1)) * (10 - i);
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9) {
        d1 = 0;
    }
    if (parseInt(rcpf2.substring(0, 1)) != d1) {
        return false;
    }
    d1 *= 2;
    for (var j = 0; j < 9; j++) {
        d1 += parseInt(rcpf1.substring(j, j + 1) + "") * (11 - j);
    }
    d1 = 11 - (d1 % 11);
    if (d1 > 9) {
        d1 = 0;
    }
    if (parseInt(rcpf2.substring(1, 2) + "") != d1) {
        return false;
    }

    if (Number(cpf) - Number(Array(12).join(cpf[0])) === 0) {
        return false;
    }
    return true;
}