const mainPartA = async () => {
  const input_test = await Deno.readTextFile('./day_6/input.txt');
  return findPositionOfDifferenChars(input_test, 4)
}

const findPositionOfDifferenChars = (content: string, limiter: number): number => {
  loop: for(let i =0; i<content.length-limiter -1; i++) {
    const placeHolderSet = new Set();
    let j = 0;
    for(j = 0; j < limiter; j++) {
      if(placeHolderSet.has(content[i+j])) {
        continue loop;
      } else {
        placeHolderSet.add(content[i+j])
      }
    }
    return j + i + 1;
  }
  return 0;
}
console.log(`Part A is: ${await mainPartA()}`);

const mainPartB = async (): Promise<number> => {
  const input_test = await Deno.readTextFile('./day_6/input.txt');
  return findPositionOfDifferenChars(input_test, 14)
}

console.log(`Part B is: ${await mainPartB()}`)