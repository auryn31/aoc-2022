const input_test = await Deno.readTextFile('./day_12/input.txt');

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

let start = [0, 0];
let end = [0, 0];
const lines = input_test.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('S')) {
    start = [i, lines[i].indexOf('S')];
  }
  if (lines[i].includes('E')) {
    end = [i, lines[i].indexOf('E')];
  }
}

const valueMap: number[][] = Array.from({ length: lines.length }, () =>
  Array.from({ length: lines[0].length }, () => 0)
);
for (let i = 0; i < lines.length; i++) {
  for (let j = 0; j < lines[i].length; j++) {
    if (lines[i][j] == 'S') {
      valueMap[i][j] = 0;
    } else if (lines[i][j] == 'E') {
      valueMap[i][j] = 27;
    } else {
      valueMap[i][j] = alphabet.indexOf(lines[i][j]) + 1;
    }
  }
}

console.log(valueMap.map(it => it.join(' ')).join('\n'))
console.log(`Start: ${start}, value: ${valueMap[start[0]][start[1]]}`)
console.log(`End: ${end}, value: ${valueMap[end[0]][end[1]]}`)

const isValid = (visited: boolean[][], col: number, row: number, old_col: number, old_row: number): boolean =>
  !(row < 0 || col < 0 || row >= visited.length || col >= visited[0].length || visited[row][col]) 
  && valueMap[row][col] - valueMap[old_row][old_col] <= 1;

const bfs = (grid: number[][]): number => {
  const height = grid.length;
  if (height == 0) return 0;
  const length = grid[0].length;
  const visited: boolean[][] = Array.from(Array(height), () => Array(length).fill(false));
  const stack: number[][] = [];
  stack.push([...start, 0]);
  while (stack.length != 0) {
    const [row, col, steps] = stack.pop() as number[];
    if(row == end[0] && col == end[1]) {
     return steps 
    }
    visited[row][col] = true;
    if (isValid(visited, col, row -1, col, row)) stack.push([row - 1, col, steps+1]);
    if (isValid(visited, col, row+1, col, row)) stack.push([row + 1, col, steps+1]);
    if (isValid(visited, col - 1, row, col, row)) stack.push([row, col - 1, steps+1]);
    if (isValid(visited, col + 1, row, col, row)) stack.push([row, col + 1, steps+1]);
  }
 throw 'Nothing found' 
};

console.log("Result: ")
console.log(bfs(valueMap));
