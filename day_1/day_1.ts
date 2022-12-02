console.log('Day 1 a ✨');
const input = await Deno.readTextFile('./day_1/day_1.txt');

const elvesCalories = input
  .split('\n\n')
  .map((elve) =>
    elve
      .split('\n')
      .map((calories) => parseInt(calories))
      .reduce((a, b) => a + b, 0)
  )
  .sort((a, b) => b - a);

console.log(`Most calories on one elve: ${elvesCalories[0]}`);

console.log(`Calories on top three elve: ${elvesCalories.slice(0, 3).reduce((a, b) => a + b, 0)}`);
