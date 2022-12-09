import { readLines } from 'https://deno.land/std/io/buffer.ts';

async function main() {
    const input = await Deno.open('input.txt');
    const highestTotal: number[] = [];
    let comparisonTotal = 0;
    
    for await(const line of readLines(input)){
        if(line === '') {
            if(highestTotal.length < 3) 
                highestTotal.push(comparisonTotal);

            else for(let i = 0; i < highestTotal.length; i++){
                if(comparisonTotal > highestTotal[i]){
                    highestTotal.splice(i, 0, comparisonTotal);
                    highestTotal.pop();
                    break;
                }
            }

            comparisonTotal = 0;
        }
        else comparisonTotal += +line;
    }
    
    console.log('TOTAL:', sumArray(highestTotal));
    return;
}

function sumArray(arr: number[]){
    return arr.reduce((total, current) => (total + current));    
}

await main();