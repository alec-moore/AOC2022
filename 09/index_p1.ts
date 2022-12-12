import { readLines } from 'https://deno.land/std/io/buffer.ts';

async function main() {
    const input = await Deno.open('input09.txt');
    const trackingMap: boolean[][] = [[ true ]];
    const instructions = await getInstructions(input);

    let positions = {
        head: { x: 0, y: 0 },
        tail: { x: 0, y: 0 },
    }

    for(const instruction of instructions){
        move(trackingMap, positions, instruction.move, instruction.count);
    }

    console.log(countMap(trackingMap), positions);

    return;
}

function countMap(trackingMap){
    let count = 0;
    for(let y = 0; y < trackingMap.length; y++){
        let mappy = '';
        for(let x = 0; x < trackingMap[y].length; x++){
            if(trackingMap[y][x] === true){
                count++;
                mappy += 'x'
            }
            else  mappy += 'o';
        }
        console.log(mappy)
    }

    return count;
}

interface Positions{
    head: { x: number; y: number;};
    tail: { x: number; y: number;};
}

function move(trackingMap: boolean[][], positions: Positions, direction: string, count: number): void{
    while(count-- > 0){
        switch(direction){
            case 'R':
                //if tail is up or down from head, don't move
                if(
                    positions.tail.y !== (positions.head.y + 1)
                    && positions.tail.y !== (positions.head.y - 1)
                ){
                    // If same spot, don't move tail
                    if(positions.tail.x !== positions.head.x || positions.tail.y !== positions.head.y)
                        positions.tail.x++;
                    positions.head.x++;
                }
                break;
            case 'L':
                //if tail is up or down from head, don't move
                if(
                    positions.tail.y !== (positions.head.y + 1)
                    && positions.tail.y !== (positions.head.y - 1)
                ){
                    if(positions.tail.x !== positions.head.x || positions.tail.y !== positions.head.y)
                        positions.tail.x--;
                    positions.head.x--;
                }
                break;
            case 'U':
                //if tail is right or left from head
                if(
                    positions.tail.x !== (positions.head.x + 1)
                    && positions.tail.x !== (positions.head.x - 1)
                ){
                    if(positions.tail.x !== positions.head.x || positions.tail.y !== positions.head.y)
                        positions.tail.y--;
                    positions.head.y--;
    
                }
                //should be inverse for array
                break;
            case 'D':
                //if tail is right of left from head
                if(
                    positions.tail.x !== (positions.head.x + 1)
                    && positions.tail.x !== (positions.head.x - 1)
                ){
                    if(positions.tail.x !== positions.head.x || positions.tail.y !== positions.head.y)
                        positions.tail.y++;
                    positions.head.y++;
                }
                break;
        }
        if(positions.tail.y < 0) positions.tail.y = 0;
        if(positions.tail.x < 0) positions.tail.x = 0;
        if(positions.head.y < 0) positions.head.y = 0;
        if(positions.head.x < 0) positions.head.x = 0;
        
        if(trackingMap.length <= (positions.tail.y + 1))
            while(trackingMap.length <= (positions.tail.y + 1)) 
                trackingMap.push([])
        
        if(trackingMap[positions.tail.y].length <= (positions.tail.x + 1)) 
            while(trackingMap[positions.tail.y].length <= (positions.tail.x + 1)) 
                trackingMap[positions.tail.y].push(false);
    
        trackingMap[positions.tail.y][positions.tail.x] = true;
    }
}

async function getInstructions(input): Promise<{move: string; count: number}[]> {
    let instructions: {move: string; count: number}[] = [];
    
    for await(const line of readLines(input)){
        const instr = line.split(' ');
        instructions.push({ move: instr[0], count: +instr[1]});
    }

    return instructions;
}

await main();