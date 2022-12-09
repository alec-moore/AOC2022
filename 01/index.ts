import { readLines } from 'https://deno.land/std/io/buffer.ts';

const scoreMap = {
    rock: 1,
    paper: 2,
    scissors: 3,
};

const decodesMap = {
    A: 'rock',
    B: 'paper',
    C: 'scissors',
    X: 'rock',
    Y: 'paper',
    Z: 'scissors'
};

const winCases = {
    paper: 'rock',
    rock: 'scissors',
    scissors: 'paper'
}

async function main() {
    const input = await Deno.open('input02.txt');
    let total = 0;
    let totalP2 = 0;
    
    for await(const line of readLines(input)){
        const choices = line.split(' ');
        const score = getScorePart1(choices[0], choices[1])
        total += score;
        const scoreP2 = getScorePart2(choices[0], choices[1]);
        totalP2 += scoreP2;
    }
    
    console.log('TOTAL part1:', total);
    console.log('TOTAL part2:', totalP2);
    return;
}

function getScorePart1(opponentChoice: string, yourChoice: string): number{
    const decodedOpponentChoice = decodesMap[opponentChoice];
    const decodedYourChoice = decodesMap[yourChoice];

    return getScoreCalc(decodedOpponentChoice, decodedYourChoice);
}

function getScorePart2(opponentChoice: string, outcome: string): number{
    const decodedOpponentChoice = decodesMap[opponentChoice];
    let yourChoice; 

    if(outcome === 'X') 
        yourChoice = winCases[decodedOpponentChoice];
    else if(outcome === 'Y')
        yourChoice = decodedOpponentChoice;
    else if(outcome === 'Z')
        yourChoice = Object.keys(winCases).find(key => winCases[key] === decodedOpponentChoice);

    return getScoreCalc(decodedOpponentChoice, yourChoice);
}

function getScoreCalc(opponentChoice, yourChoice): number{
    if(opponentChoice === yourChoice)
        return 3 + scoreMap[yourChoice];
    if(winCases[opponentChoice] === yourChoice) 
        return scoreMap[yourChoice]; // Your loss
    if(winCases[yourChoice] === opponentChoice)
        return 6 + scoreMap[yourChoice];

    return 0; // something went horribly wrong
}

await main();