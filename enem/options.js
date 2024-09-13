import {clear, print, getPositiveNumber, getNumber, getData} from './functions.js'

function criarMatriz(dados){
    const matriz = []
    const linhas = dados.split('\n')
    const linhasPreenchidas = []

    for (let i = 0; i < linhas.length; i ++){
        if (linhas[i].trim() !== ''){
            linhasPreenchidas.push(linhas[i])
        }
    }

    for (let j = 0; j < linhasPreenchidas.length; j ++){
        matriz.push(linhasPreenchidas[j].split(';'))
    }

    return matriz
}
//1.0
function topBrasil(matriz){
    console.clear()

    const N = getPositiveNumber(getNumber('Top N escolas : '))

    let resposta = ''

    for (let i = 0; i < N; i ++){
        let topTier = `${i+1} : ${matriz[i][1]} > ${matriz[i][7]} \n`
        resposta += topTier
    }

    print(resposta)
    clear()
}
//2.0
function topArea(matriz){
    console.clear()

    const N = getPositiveNumber(getNumber('Top N por area : '))
    print(`
        8 - Linguagens
        9 - Matematica
        10 - Ciencias da Natureza
        11 - Humanas
        12 - Redação
        `)
    const area = getPositiveNumber(getNumber('> '))

    const notasArea = [] 
    let resposta = ''

    for (let i = 0; i < matriz.length; i++) {
        notasArea.push(matriz[i][area])
    }

    notasArea.sort();

    const notasOrdenadas = []

    for (let z = notasArea.length - 1; z >= 0; z --){
        notasOrdenadas.push(notasArea[z])
    }

    for (let j = 0; j < N; j ++){
        resposta += `${j+1} --> ${notasOrdenadas[j]} \n`
    }

    print(resposta)

    clear()
}
//3.0
function topEstado(matriz){
    console.clear()

    const N = getPositiveNumber(getNumber('Top N por estado : '))
    const estado = getData('Estado (PI, SP, RJ): ')

    const todasEstado = []
    let resposta = ''

    for (let i = 0; i < matriz.length; i ++){
        if (matriz[i][3] == estado){
            todasEstado.push(`${matriz[i][1]} > ${matriz[i][7]}`)
        }
    }
    
    for (let j = 0; j < N; j ++){
        resposta += `${todasEstado[j]} \n` 
    }

    print(resposta)

    clear()
    
}
//4.0
function escolasPorRenda(matriz){
    console.clear();

    const estado = getData('Estado (PI, SP, RJ): '); 
    const escolasEstado = [];
    let resposta = '';

    for (let i = 0; i < matriz.length; i++) {
        if (matriz[i][3] === estado) {
            escolasEstado.push(matriz[i]); 
        }
    }

    escolasEstado.sort((a, b) => parseFloat(b[6]) - parseFloat(a[6]));

    for (let j = 0; j < escolasEstado.length; j++) {
        resposta += `${j + 1} - ${escolasEstado[j][1]} (Renda: ${escolasEstado[j][6]})\n`;
    }

    print(resposta);

    clear();
}
//5.0
function mediaPorArea(matriz){
    console.clear()

    print(`
    8 - Linguagens
    9 - Matematica
    10 - Ciencias da Natureza
    11 - Humanas
    12 - Redação    
    `)
    const area = getPositiveNumber(getNumber('> '))
    
    const notasArea = []

    for (let itens of matriz) {
        notasArea.push(itens[area])
    }

    let somatorio = 0
    let qtd = notasArea.length

    for (let notas of notasArea){
        somatorio += parseFloat(notas)
    }
    
    const media = somatorio / qtd

    print(`Média > ${media.toFixed(2)}`)

    clear()
}
//6.0
function melhorAreaEstado(matriz){
    console.clear()

    print(`
        8 - Linguagens
        9 - Matematica
        10 - Ciencias da Natureza
        11 - Humanas
        12 - Redação    
        `)
    const area = getPositiveNumber(getNumber('> '))
    const estado = getData('(ex: PI, RS, AM) > ')

    let escolasEstado = []
    let maiorNota = -Infinity
    let escola = ''

    for (let escolas of matriz){
        if(escolas[3] == estado){
            escolasEstado.push(escolas)   
        }
    }

    for (let i = 0; i < escolasEstado.length; i ++){
        if (parseFloat(escolasEstado[i][area]) > maiorNota){
            maiorNota = parseFloat(escolasEstado[i][area])
            escola = escolasEstado[i][1]
        }
    }

    print(`
        Escola : ${escola}
        Nota : ${maiorNota}
        `)

    clear()
}
//7.0
function estadoRede(matriz){
    console.clear()

    const estado = getData('(PI, PE, RN) > ')
    print(`
        1 - Privada
        2 - Pública
        `)
    const rede = getPositiveNumber(getNumber('> '))

    let escolasEstado = []

    for (let escolas of matriz){
        if (escolas[3] == estado){
            escolasEstado.push(escolas)
        }
    }

    switch (rede){
        case 1 :
            const {maiorNotaPrivada, nomePrivada} = melhorEscolaPrivada(escolasEstado)
            print(`
                Escola : ${nomePrivada}
                Nota   : ${maiorNotaPrivada} 
                `)
            break
        case 2 :
            const {maiorNotaPublica, nomePublica} = melhorEscolaPublica(escolasEstado)
            print(`
                Escola : ${nomePublica}
                Nota   : ${maiorNotaPublica} 
                `)
            break
    }

    clear()
}
//7.1
function melhorEscolaPrivada(escolasEstado){

    let escolasPrivadas = []
    let maiorNotaPrivada = -Infinity
    let nomePrivada = ''

    for (let i = 0; i < escolasEstado.length; i ++){
        if (escolasEstado[i][4] == 'Privada'){
            escolasPrivadas.push(escolasEstado[i])
        }
    }

    for (let j = 0; j < escolasPrivadas.length; j ++){
        if (parseFloat(escolasPrivadas[j][7]) > maiorNotaPrivada){
            maiorNotaPrivada = parseFloat(escolasPrivadas[j][7])
            nomePrivada = escolasPrivadas[j][1]
        }
    }

    return {nomePrivada, maiorNotaPrivada}
}
//7.2
function melhorEscolaPublica(escolasEstado){
    let escolasPublicas = []
    let maiorNotaPublica = -Infinity
    let nomePublica = ''

    for (let i = 0; i < escolasEstado.length; i ++){
        if (escolasEstado[i][4] !== 'Privada'){
            escolasPublicas.push(escolasEstado[i])
        }
    }

    for (let j = 0; j < escolasPublicas.length; j ++){
        if (parseFloat(escolasPublicas[j][7]) > maiorNotaPublica){
            maiorNotaPublica = parseFloat(escolasPublicas[j][7])
            nomePublica = escolasPublicas[j][1]
        }
    }

    return {nomePublica, maiorNotaPublica}
}
//8.0
function mostrarEscola(matriz) {
    console.clear();

    const nome = getData('Nome da escola > ')
    let resposta = ''
    let encontrou = false

    for (let registrosDasEscolas of matriz) {
        if (registrosDasEscolas[1] === nome) {
            resposta += registrosDasEscolas
            encontrou = true
        }
    }

    if (encontrou == false){
        print('Escola nao encontrada')
    }else{
        print(resposta)
    }

    clear();
}
//9.0
function rankingEstado(matriz){
    console.clear()

    const estado = getData('Estado (PI, SP, RJ): ')

    const todasEstado = []
    let resposta = ''

    for (let i = 0; i < matriz.length; i ++){
        if (matriz[i][3] == estado){
            todasEstado.push(`${matriz[i][1]}`)
        }
    }
    
    for (let j = 0 ; j < todasEstado.length; j ++){
        resposta += `${j + 1} > ${todasEstado[j]} \n`
    }

    print(resposta)
    clear()
    
}
//10.0
function rankingRegiao(matriz){
    console.clear()

    const N =  getPositiveNumber(getNumber('Top N por regiao : '))
    print(`
        1 - Sul
        2 - Sudeste
        3 - Centro Oeste
        4 - Nordeste
        5 - Norte
        `)

    const regiao = getPositiveNumber(getNumber('> '))

    switch (regiao){
        case 1 :
            topSul(N, matriz)
            break
        case 2 :
            topSudeste(N, matriz)
            break
        case 3 :
            topCentroOeste(N, matriz)
            break
        case 4 :
            topNordeste(N, matriz)
            break
        case 5 :
            topNorte(N, matriz)
    }

    clear()
}
//10.1
function topSul(N, matriz){
    let sul = []
    let resposta = ''

    for (let i = 0; i < matriz.length; i ++){
        switch (matriz[i][3]){
            case 'PR' :
                sul.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'SC' :
                sul.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'RS' :
                sul.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
        }
    }

    for (let j = 0; j < N; j ++){
        resposta += `${j+1} - ${sul[j]} \n`
    }

    print(resposta)
}
//10.2
function topSudeste(N, matriz){
    let sudeste = []
    let resposta = ''

    for (let i = 0; i < matriz.length; i ++){
        switch (matriz[i][3]){
            case 'ES' :
                sudeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'MG' :
                sudeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'SP' :
                sudeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'RJ' :
                sudeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
        }
    }

    for (let j = 0; j < N; j ++){
        resposta += `${j+1} - ${sudeste[j]} \n`
    }

    print(resposta)
}
//10.3
function topCentroOeste(N, matriz){
    let centroOeste = []
    let resposta = ''

    for (let i = 0; i < matriz.length; i ++){
        switch (matriz[i][3]){
            case 'GO' :
                centroOeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'MT' :
                centroOeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'MS' :
                centroOeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
        }
    }

    for (let j = 0; j < N; j ++){
        resposta += `${j+1} - ${centroOeste[j]} \n`
    }

    print(resposta)
}
//10.4
function topNordeste(N, matriz){
    let nordeste = []
    let resposta = ''

    for (let i = 0; i < matriz.length; i ++){
        switch (matriz[i][3]){
            case 'AL' :
                nordeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'BA' :
                nordeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'CE' :
                nordeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'MA' :
                nordeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'PI' :
                nordeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'PB' :
                nordeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'PN' :
                nordeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'RN' :
                nordeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'SE' :
                nordeste.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
        }
    }

    for (let j = 0; j < N; j ++){
        resposta += `${j+1} - ${nordeste[j]} \n`
    }

    print(resposta)
}
//10.5
function topNorte(N, matriz){
    let norte = []
    let resposta = ''

    for (let i = 0; i < matriz.length; i ++){
        switch (matriz[i][3]){
            case 'AC' :
                norte.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'AP' :
                norte.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'AM' :
                norte.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'PA' :
                norte.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'RO' :
                norte.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'RR' :
                norte.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
            case 'TO' :
                norte.push(`${matriz[i][1]} > ${matriz[i][3]}`)
                break
        }
    }

    for (let j = 0; j < N; j ++){
        resposta += `${j+1} - ${norte[j]} \n`
    }

    print(resposta)
}

export {mediaPorArea,melhorAreaEstado,mostrarEscola,rankingEstado,rankingRegiao,topArea,topBrasil,criarMatriz,topEstado,estadoRede,escolasPorRenda}