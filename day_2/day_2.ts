// A -> Rock -> 1
// B -> Paper -> 2
// C -> Scissors -> 3
// X -> Rock -> 1
// Y -> Paper -> 2
// Z -> Scissors -> 3

// Loose -> 0
// Draw -> 3
// Win -> 6

const valueFromSymbol = (symbol: string): number => {
  switch (symbol) {
    case 'X':
      return 1;
    case 'Y':
      return 2;
    case 'Z':
      return 3;
    default:
      return 0;
  }
};

const valueFromGame = (round: string): number => {
  switch (round) {
    case 'A X':
      return 3;
    case 'A Y':
      return 6;
    case 'A Z':
      return 0;
    case 'B X':
      return 0;
    case 'B Y':
      return 3;
    case 'B Z':
      return 6;
    case 'C X':
      return 6;
    case 'C Y':
      return 0;
    case 'C Z':
      return 3;
    default:
      return 0;
  }
};

// x -> loose
// y -> draw
// z -> win
const valueFromGamePartB = (round: string): number => {
  switch (round) {
    case 'A X':
      return 0 + 3;
    case 'A Y':
      return 3 + 1;
    case 'A Z':
      return 6 + 2;
    case 'B X':
      return 0 + 1;
    case 'B Y':
      return 3 + 2;
    case 'B Z':
      return 6 + 3;
    case 'C X':
      return 0 + 2;
    case 'C Y':
      return 3 + 3;
    case 'C Z':
      return 6 + 1;
    default:
      return 0;
  }
};

console.log('Day 2 ✨');
const input = await Deno.readTextFile('./day_2/day_2.txt');
const games = input.split('\n');

const result_a = games
  .map((it) => valueFromGame(it) + valueFromSymbol(it.split(' ')[1]))
  .reduce((a, b) => a + b, 0);
console.log(`Result Part A: ${result_a}`);
const result_b = games.map(valueFromGamePartB).reduce((a, b) => a + b, 0);

console.log(`Result Part B: ${result_b}`);
