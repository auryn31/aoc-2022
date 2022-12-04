import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { gameResultPartA, gameResultPartB, oneContainsOther, parseLine } from './index.ts';

Deno.test('Day 4 Part A Test', async () => {
  const input_test = await Deno.readTextFile('./day_4/input.test.txt');
  const result = gameResultPartA(input_test);
  assertEquals(result, 2);
});

Deno.test('Day 4 Part B Test', async () => {
  const input_test = await Deno.readTextFile('./day_4/input.test.txt');
  const result = gameResultPartB(input_test);
  assertEquals(result, 4);
});

Deno.test('Day 4 Part A', async () => {
  const input_test = await Deno.readTextFile('./day_4/input.txt');
  const result = gameResultPartA(input_test);
  assertEquals(result, 602);
});

Deno.test('Day 4 Part B', async () => {
  const input_test = await Deno.readTextFile('./day_4/input.txt');
  const result = gameResultPartB(input_test);
  assertEquals(result, 891);
});

Deno.test('split line', async () => {
  const input_test = await Deno.readTextFile('./day_4/input.test.txt');
  const result = parseLine(input_test.split('\n')[0]);
  assertEquals(result, [
    [2, 4],
    [6, 8],
  ]);
});

Deno.test('split line', async () => {
  const input_test = await Deno.readTextFile('./day_4/input.test.txt');
  const result = parseLine(input_test.split('\n')[0]);
  const leftContainsRight = oneContainsOther(result)
  assertEquals(leftContainsRight, false);
});

Deno.test('split line', async () => {
  const input_test = await Deno.readTextFile('./day_4/input.test.txt');
  const result = parseLine(input_test.split('\n')[4]);
  const leftContainsRight = oneContainsOther(result)
  assertEquals(leftContainsRight, true);
});
