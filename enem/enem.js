import { getNumber, getPositiveNumber, print } from './functions.js'
import * as option from './options.js'
import { readFileSync } from 'fs'

function main(){
    let professorMePassaPeloAmorDeDeus = 1

    const menu = `
    1 - Top N Brasil 
    2 - Top N por área
    3 - Top N por estado
    4 - Listar escolas do estado pela renda 
    5 - Média por área
    6 - Melhor escola por área e estado
    7 - Melhor escola por estado e rede
    8 - Buscar por nome 
    9 - Ranking ENEM por estado
    10 - Ranking ENEM por região
    100 - Sair
    `

    const dados = readFileSync('enem2014_nota_por_escola.txt.csv', 'utf-8')
    const matriz = option.criarMatriz(dados)

    while (professorMePassaPeloAmorDeDeus !== 0){
        print(menu)
        const resposta = getPositiveNumber(getNumber('>  '))

        switch (resposta){
            case 1 : 
                option.topBrasil(matriz)
                break

            case 2 : 
                option.topArea(matriz)
                break

            case 3 : 
                option.topEstado(matriz)
                break

            case 4 : 
                option.escolasPorRenda(matriz)
                break

            case 5 :
                option.mediaPorArea(matriz)
                break

            case 6 : 
                option.melhorAreaEstado(matriz)
                break

            case 7 :
                option.estadoRede(matriz)
                break

            case 8 : 
                option.mostrarEscola(matriz)
                break

            case 9 :
                option.rankingEstado(matriz)
                break
            
            case 10 :
                option.rankingRegiao(matriz)
                break

            case 100 : 
                console.clear()
                print('...')
                return

            default : 
                console.clear()
                print('Tente novamente')
                break
        }
    }
}

main()