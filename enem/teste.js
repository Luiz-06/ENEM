import { readFileSync } from 'fs';
//Tentando criar matriz 

    const dados = readFileSync('enem2014_nota_por_escola.txt.csv', 'utf-8')
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