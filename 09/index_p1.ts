import { readLines } from 'https://deno.land/std/io/buffer.ts';

async function main() {
    const input = await Deno.open('input09.txt');
    const trackingMap: boolean[][] = [[ true ]];
    const instructions = await getInstructions(input);

    for(const instruction of instructions){

    }

    return;
}

function move(trackingMap: boolean[][], direction: string, count: number): void{
    switch(direction){
        case 'R':

            break;
        case 'L':
            break;
        case 'U':
            //should be inverse for array
            break;
        case 'D':
            //should be inverse for array
            break;
    }
    if(count > 0) return move(trackingMap, direction, count--);
    else return;
}

function moveHead(){}

async function getInstructions(input): Promise<{move: string; count: number}[]> {
    let instructions: {move: string; count: number}[] = [];
    
    for await(const line of readLines(input)){
        const instr = line.split(' ');
        instructions.push({ move: instr[0], count: +instr[1]});
    }

    return instructions;
}

await main();