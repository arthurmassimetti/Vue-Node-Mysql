const player1 = {
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 3,
    pontos: 0,
};

const player2 = {
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 4,
    pontos: 0,
};

const player3 = {
    nome: "Peach",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 2,
    pontos: 0,
};

const player4 = {
    nome: "Yoshi",
    velocidade: 2,
    manobrabilidade: 4,
    poder: 3,
    pontos: 0,
};

const player5 = {
    nome: "Bowser",
    velocidade: 5,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0,
};

const player6 = {
    nome: "Donkey Kong",
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
    pontos: 0,
};

//sorteia UM NUMERO ALETORIO ENTRE 1 E 6
async function rollDice(){
    return Math.floor(Math.random() * 6) + 1;
}
//sorteia um bloco e transforma ele em um result
async function getRandomBlock(){
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA"
            break;
        default:
            result = "CONFRONTO"
            break;
    }
return result

}

async function declareWinners(character1, character2){
    console.log("Resultado final:")
    console.log(`${character1.nome}: ${character1.pontos} ponto(s)`)
    console.log(`${character2.nome}: ${character2.pontos} ponto(s)`)

    if(character1.pontos > character2.pontos){
        console.log(`${character1.nome} venceu a corrida, Parabens!🏆`)
    }else if(character1.pontos < character2.pontos){
        console.log(`${character2.nome} venceu a corrida, Parabens!🏆`)
    }else {
        console.log("A corrida terminou em empate!")
    }
}

async function logRollResut(characterName, block, diceResult, attributes){
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attributes} = ${attributes + diceResult}`)
}

//define uma função com dois valores que podem ser usados
async function playRaceEngine(character1, character2){
    // usando o for dentro do java script
    for(let round = 1; round <=5; round++){
        console.log(`\n🚩 -Rodada: ${round}`)

        // sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`)

        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        //teste de habilidade
        let TotalTestSkill1 = 0
        let TotalTestSkill2 = 0
        //tres sinal de igual === é para comparar valor e nome "RETA" === "RETA" = é reta demais
        if(block === "RETA"){
            TotalTestSkill1 = diceResult1 + character1.velocidade;
            TotalTestSkill2 = diceResult2 + character2.velocidade;
            await logRollResut(
                character1.nome,
                "velocidade",
                diceResult1,
                character1.velocidade
            );
            await logRollResut(
                character2.nome,
                "velocidade",
                diceResult2,
                character2.velocidade
            );
        }
        if(block === "CURVA"){
            TotalTestSkill1 = diceResult1 + character1.manobrabilidade;
            TotalTestSkill2 = diceResult2 + character2.manobrabilidade;

            await logRollResut(
                character1.nome,
                "manobrabilidade",
                diceResult1,
                character1.manobrabilidade
            );
            await logRollResut(
                character2.nome,
                "manobrabilidade",
                diceResult2,
                character2.manobrabilidade
            );
        }
        if(block === "CONFRONTO"){
            TotalTestSkill1 =  diceResult1 + character1.poder;
            TotalTestSkill2 =  diceResult2 + character2.poder;

            await logRollResut(
                character1.nome,
                "poder",
                diceResult1,
                character1.poder
            );
            await logRollResut(
                character2.nome,
                "poder",
                diceResult2,
                character2.poder
            );

            if(TotalTestSkill1 > TotalTestSkill2){
                console.log(`${character1.nome} derrotou o ${character2.nome}`)
                character1.pontos++;
            }else if(TotalTestSkill1 < TotalTestSkill2){
                console.log(`${character1.nome} perdeu para ${character2.nome}`)
                character2.pontos++;
            }else {
                console.log("Empate tete a tete (porradaria)")


            }

        }

        if (TotalTestSkill1 > TotalTestSkill2) {
            console.log(`${character1.nome} marcou um ponto!`);
            character1.pontos++;

        } else if (TotalTestSkill1 < TotalTestSkill2) {
            console.log(`${character2.nome} marcou um ponto!`);
            character2.pontos++; // Aqui deveria estar o character

        }else if(TotalTestSkill1 == TotalTestSkill2){
            console.log(`${character1.nome} empatou com ${character2.nome}`)
        }
    console.log("-----------------------")

}
}
//função auto envocavel
(async function main(){
    console.log(
        `Corrida entre: ${player1.nome} e ${player2.nome} começando...\n`
    );
    //define os dois valores que vão ser usados
    //o await é usado para esperar algo terminar, para começar a rodar
    await playRaceEngine(player1, player2);
    await declareWinners(player1, player2)
})();


