const visitedPositions = new Set<string>();
let posHead = [0, 0];
let posTail = [0, 0];

const makeMove = (pos: number[], direction: 'R' | 'U' | 'L' | 'D'): number[] => {
  switch (direction) {
    case 'U':
      return [pos[0] + 1, pos[1]];
    case 'D':
      return [pos[0] - 1, pos[1]];
    case 'R':
      return [pos[0], pos[1] + 1];
    case 'L':
      return [pos[0], pos[1] - 1];
  }
};

const followHead = (
  posHead: number[],
  posTail: number[],
  move: 'R' | 'U' | 'L' | 'D'
): number[] => {
  //console.log(`Check   H:${posHead} T:${posTail}`)
  if (
    posHead[0] == posTail[0] ||
    posHead[1] == posTail[1] ||
    Math.abs(posHead[0] - posTail[0]) - Math.abs(posHead[1] - posTail[1]) == 0
  ) {
    if (Math.abs(posTail[0] - posHead[0]) > 1) {
      if (posTail[0] > posHead[0]) {
        return [posHead[0] + 1, posTail[1]];
      }
      return [posHead[0] - 1, posTail[1]];
    }
    if (Math.abs(posTail[1] - posHead[1]) > 1) {
      if (posTail[1] > posHead[1]) {
        return [posTail[0], posHead[1] + 1];
      }
      return [posTail[0], posHead[1] - 1];
    }
    return posTail;
  }
  switch (move) {
    case 'U':
      return [posHead[0] - 1, posHead[1]];
    case 'D':
      return [posHead[0] + 1, posHead[1]];
    case 'L':
      return [posHead[0], posHead[1] + 1];
    case 'R':
      return [posHead[0], posHead[1] - 1];
  }
};

const input_test = await Deno.readTextFile('./day_9/input.txt');
for (const line of input_test.split('\n')) {
  const parts = line.split(' ');
  const direction = parts[0] as 'D' | 'R' | 'L' | 'U';
  const amount = Number(parts[1]);
  for (let i = 0; i < amount; i++) {
    posHead = makeMove(posHead, direction);
    posTail = followHead(posHead, posTail, direction);
    visitedPositions.add(`${posTail[0]}${posTail[1]}`);
    console.log(`result: H:${posHead} T:${posTail}, moveDirection: ${direction}`);
  }
}

console.log(visitedPositions.size -1 );
console.log(Array.from(visitedPositions).sort());

// 00, 01, 02, 03, 14, 21, 22, 23, 24, 33, 34, 42, 43