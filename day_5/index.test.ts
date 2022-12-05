import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { findStackLength, gameResultPartA, makeMove, parseMove, parseStacks } from './index.ts';

Deno.test('Day 5 Part A Test', async () => {
  const input_test = await Deno.readTextFile('./day_5/input.test.txt');
  const result = gameResultPartA(input_test)
  assertEquals(result, "CMZ");
});

Deno.test('Day 5 Part A', async () => {
  const input_test = await Deno.readTextFile('./day_5/input.txt');
  const result = gameResultPartA(input_test)
  assertEquals(result, "HBTMTBSDC");
});

Deno.test('stack 1 of input', async () => {
  const input_test = await Deno.readTextFile('./day_5/input.txt');
  const parts = input_test.split('\n\n')
  const length = findStackLength(parts[0])
  assertEquals(length, 9);
});

Deno.test('get stack of input', async () => {
  const input_test = await Deno.readTextFile('./day_5/input.txt');
  const parts = input_test.split('\n\n')
  const stacks = parseStacks(parts[0])
  assertEquals(stacks[0], ['G', 'P', 'N', 'R']);
  assertEquals(stacks[6], ['L', 'Q', 'F']);
  assertEquals(stacks[1], ['H','V','S','C','L','B','J','T']);
});


Deno.test('moves test', async () => {
  const input_test = await Deno.readTextFile('./day_5/input.test.txt');
  const parts = input_test.split('\n\n')
  let stacks = parseStacks(parts[0])
  const moves = parts[1].split('\n').map(parseMove)
  for(const move of moves) {
    stacks = makeMove(stacks, move)
  }
  assertEquals(stacks, [['C'], ['M'], ['Z', 'N', 'D', 'P']]);
});

Deno.test('Test Move', async () => {
  const input_test = await Deno.readTextFile('./day_5/input.test.txt');
  const parts = input_test.split('\n\n')
  let stacks = parseStacks(parts[0])
  const moves = parts[1].split('\n').map(parseMove)
  stacks = makeMove(stacks, moves[0])
  assertEquals(stacks, [['D', 'N', "Z"], ['C', 'M'], ['P']]);
});

Deno.test('parse line', () => {
  const result = parseMove('move 1 from 2 to 1')
  assertEquals(result, {from: 1, to: 0, amount: 1});
});

Deno.test('parse stack', async () => {
  const input_test = await Deno.readTextFile('./day_5/input.test.txt');
  const result = parseStacks(input_test.split('\n\n')[0])
  assertEquals(result, [['N', "Z"], ['D', 'C', 'M'], ['P']]);
});