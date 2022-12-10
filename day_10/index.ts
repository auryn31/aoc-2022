const input_test = await Deno.readTextFile('./day_10/input.txt');

const cyclesToCheck = [20, 60, 100, 140, 180, 220];
let counter = 0;
let currentX = 1;
let sum = 0;
const display: string[][] = Array.from({ length: 6 }, () => Array.from({ length: 40 }, () => ' '));
const printDisplay = (display: string[][]) => {
  for (const row of display) {
    console.log(row.join(''));
  }
};

for (const line of input_test.split('\n')) {
  counter++;
  if (cyclesToCheck.includes(counter)) {
    sum += counter * currentX;
  }
  const parts = line.split(' ');
  const operator = parts[0] as 'noop' | 'addx';
  if (operator == 'addx') {
    counter++;
    if (cyclesToCheck.includes(counter)) {
      sum += counter * currentX;
    }
    currentX += Number(parts[1]);
  }
}
console.log(`Sum Part A: ${sum} 🎉`);

let currentDisplayRow = 0;
currentX = 1;
counter = 0;

for (const line of input_test.split('\n')) {
  let currentPos = counter % 40;
  if (currentPos == currentX- 1 || currentPos == currentX|| currentPos == currentX+ 1)
    display[currentDisplayRow][counter % 40] = '#';
  counter++;
  if (counter % 40 == 0) {
    currentDisplayRow++;
  }
  const parts = line.split(' ');
  const operator = parts[0] as 'noop' | 'addx';
  if (operator == 'addx') {
    currentPos = counter % 40;
    if (currentPos == currentX- 1 || currentPos == currentX|| currentPos == currentX+ 1)
      display[currentDisplayRow][counter % 40] = '#';
    counter++;
    if (counter % 40 == 0) {
      currentDisplayRow++;
    }
    currentX += Number(parts[1]);
  }
}
printDisplay(display);
