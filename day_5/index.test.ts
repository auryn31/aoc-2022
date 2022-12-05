import { assertEquals } from 'https://deno.land/std@0.167.0/testing/asserts.ts';
import { findStackLength, gameResultPartA, gameResultPartB, makeMove, makeMovePartB, parseMove, parseStacks } from './index.ts';

Deno.test('Day 5 Part A Test', async () => {
  const input_test = await Deno.readTextFile('./day_5/input.test.txt');
  const result = gameResultPartA(input_test)
  assertEquals(result, "CMZ");
});

Deno.test('Day 5 Part B Test', async () => {
  const input_test = await Deno.readTextFile('./day_5/input.test.txt');
  const result = gameResultPartB(input_test)
  assertEquals(result, "MCD");
});

Deno.test('Day 5 Part A', async () => {
  const input_test = await Deno.readTextFile('./day_5/input.txt');
  const result = gameResultPartA(input_test)
  assertEquals(result, "HBTMTBSDC");
});

Deno.test('Day 5 Part B', async () => {
  const input_test = await Deno.readTextFile('./day_5/input.txt');
  const result = gameResultPartB(input_test)
  assertEquals(result, "PQTJRSHWS");
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

Deno.test('Test moves of CrateMover 9001 keep same order on moves', async () => {
  const input_test = await Deno.readTextFile('./day_5/input.txt');
  const parts = input_test.split('\n\n')
  let stacks = parseStacks(parts[0])
  assertEquals(stacks[6], ['L', 'Q', 'F']);
  const moves = parts[1].split('\n').map(parseMove)
  stacks = makeMovePartB(stacks, moves[0])
  assertEquals(stacks[6], ['L', 'N', 'M', 'L', 'Q', 'F']);
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