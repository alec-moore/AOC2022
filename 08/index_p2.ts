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
    for(let i = 0; i < heightMap.length; i++){
        for(let j = 0; j < heightMap[i].length; j++){
            const viewScore = isHighest(heightMap, j, i);
            if(viewScore > count) count = viewScore;
        }
    }

    return count;
}

function isHighest(heightMap, xIndex, yIndex){
    const above = isHighestAbove(heightMap, xIndex, yIndex);
    const below = isHighestBelow(heightMap, xIndex, yIndex);
    const left = isHighestLeft(heightMap, xIndex, yIndex);
    const right = isHighestRight(heightMap, xIndex, yIndex);

    return above * below * left * right;
}

function isHighestLeft(heightMap, xIndex, yIndex){
    const tree = heightMap[yIndex][xIndex];

    let viewDistance = 0;

    while(--xIndex >= 0){
        viewDistance++;
        const browseHeight = heightMap[yIndex][xIndex];
        if(browseHeight >= tree) return viewDistance;
    }
    //console.log(tree, 'left');

    return viewDistance;
}

function isHighestRight(heightMap, xIndex, yIndex){
    const tree = heightMap[yIndex][xIndex];
    const width = heightMap[yIndex].length;

    let viewDistance = 0;

    while(++xIndex < width){
        viewDistance++;
        const browseHeight = heightMap[yIndex][xIndex];
        if(browseHeight >= tree) return viewDistance;
    }
    //console.log(tree, 'right');
    return viewDistance;
}

function isHighestBelow(heightMap, xIndex, yIndex){
    const tree = heightMap[yIndex][xIndex];
    const width = heightMap.length;

    let viewDistance = 0;

    while(++yIndex < width){
        viewDistance++;
        const browseHeight = heightMap[yIndex][xIndex];
        if(browseHeight >= tree) return viewDistance;
    }
    //console.log(tree, 'below');
    return viewDistance;
}

function isHighestAbove(heightMap, xIndex, yIndex){
    const tree = heightMap[yIndex][xIndex];

    let viewDistance = 0;

    while(--yIndex >= 0){
        viewDistance++;
        const browseHeight = heightMap[yIndex][xIndex];
        if(browseHeight >= tree) return viewDistance;
    }
    //console.log(tree, 'above');
    return viewDistance;
}

await main();