import { readLines } from 'https://deno.land/std/io/buffer.ts';

async function main() {
    const input = await Deno.open('input08.txt');
    const heightMap = await getHeightMap(input);

    const trees = getTallTrees(heightMap);
    console.log(trees);
    
    return;
}

async function getHeightMap(input): Promise<number[][]> {
    let y = 0;
    let heightMap: number[][] = [];
    
    for await(const line of readLines(input)){
        const heights = line.split('');
        for(const height of heights){
            if(!heightMap[y]) heightMap.push([]);
            heightMap[y].push(+height);
        }
        y++;
    }
    return heightMap;
}

function getTallTrees(heightMap){
    let count = 0;
    for(let i = 0; i < heightMap.length; i++)
        for(let j = 0; j < heightMap[i].length; j++)
            count += (isHighest(heightMap, j, i) ? 1 : 0);

    return count;
}

function isHighest(heightMap, xIndex, yIndex){
    if(isHighestAbove(heightMap, xIndex, yIndex)) return true;
    if(isHighestBelow(heightMap, xIndex, yIndex)) return true;
    if(isHighestLeft(heightMap, xIndex, yIndex)) return true;
    if(isHighestRight(heightMap, xIndex, yIndex)) return true;
    //console.log(heightMap[yIndex][xIndex], 'nothin\n');
    return false;
}

function isHighestLeft(heightMap, xIndex, yIndex){
    const tree = heightMap[yIndex][xIndex];

    while(--xIndex >= 0){
        if(heightMap[yIndex][xIndex] >= tree) return false;
    }
    //console.log(tree, 'left');

    return true;
}

function isHighestRight(heightMap, xIndex, yIndex){
    const tree = heightMap[yIndex][xIndex];
    const width = heightMap[yIndex].length;

    while(++xIndex < width){
        if(heightMap[yIndex][xIndex] >= tree) return false;
    }
    //console.log(tree, 'right');
    return true;
}

function isHighestBelow(heightMap, xIndex, yIndex){
    const tree = heightMap[yIndex][xIndex];
    const width = heightMap.length;

    while(++yIndex < width){
        if(heightMap[yIndex][xIndex] >= tree) return false;
    }
    //console.log(tree, 'below');
    return true;
}

function isHighestAbove(heightMap, xIndex, yIndex){
    const tree = heightMap[yIndex][xIndex];

    while(--yIndex >= 0){
        if(heightMap[yIndex][xIndex] >= tree) return false;
    }
    //console.log(tree, 'above');
    return true;
}

await main();