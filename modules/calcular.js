import Database from 'better-sqlite3';
const db = new Database('D:/#BANCOS/milhasdb.db');

function PegarPrecos(milhas,prog){
    let sql = `SELECT DIA01, DIA30, DIA45, DIA60 FROM DIAS_VALORES WHERE IDMILHAS = (SELECT IDMILHAS FROM MILHAS WHERE TOTALMILHAS = ${milhas} AND IDPROGRAMA = ${prog})`
    const row = db.prepare(sql).all();
    let valores = row[0]

    return valores
}

function SimplificarMilha(valor){
    let total = Math.floor(valor/1000)
    return total
}

function ValorMilha(qntMilhas){
    let milhas;
    if (qntMilhas <= 20) {
        milhas = 20
    }else if (qntMilhas > 20 && qntMilhas < 50){
        milhas = 30
    }else if (qntMilhas >= 50 && qntMilhas < 70){
        milhas = 50
    }else if (qntMilhas >= 70 && qntMilhas < 100){
        milhas = 70
    }else
        milhas = 100
    
    return milhas
}

export function CalcularMilhas(qntMilhas,programa){

    //DIVIDI AS MILHAS POR MIL PARA SIMPLIFICAR
    qntMilhas = SimplificarMilha(qntMilhas)

    //RETORNA VALOR ARREDONDADO PARA BUSCAR PREÇO DA MILHA
    let milhas = ValorMilha(qntMilhas)

    //PEGAR O PREÇO DA MILHA
    let precos = PegarPrecos(milhas,programa)

    let prog;

    if (programa==1){
        prog = 'SMILES'
    }else if (programa==2){
        prog = 'LATAM PASS'
    }else
        prog = 'TUDO AZUL'

    let total = {
        "milha": (qntMilhas),
        "progm": (prog),
        "dia01": (precos.DIA01 * qntMilhas).toFixed(2),
        "dia30": (precos.DIA30 * qntMilhas).toFixed(2),
        "dia45": (precos.DIA45 * qntMilhas).toFixed(2),
        "dia60": (precos.DIA60 * qntMilhas).toFixed(2)
    }
    return total
}