import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { findKey, gameResultPartA, gameResultPartB, splitContent, valueOfKey } from "./day_3.ts";

Deno.test("Day 3 Part A Test", async () => {
  const input_test = await Deno.readTextFile('./day_3/input_test.txt');
  const result = gameResultPartA(input_test)
  assertEquals(result, 157);
});


Deno.test("Check that parts are correct", async () => {
  const input_test = await Deno.readTextFile('./day_3/input_test.txt');
  const line1 = input_test.split('\n')[0]
  const result = splitContent(line1)
  assertEquals(Array.from(result.partA.keys()).join(''), 'vJrwpWtg');
  assertEquals(Array.from(result.partB.keys()).join(''), 'hcsFMfp');
});

Deno.test("Check split of line NNRFQfzbNWhLHTVh", () => {
  const result = splitContent('NNRFQfzbNWhLHTVh')
  assertEquals(Array.from(result.partA.keys()).join(''), 'NRFQfzb');
  assertEquals(Array.from(result.partB.keys()).join(''), 'NWhLHTV');
});


Deno.test("Find key in line one", async () => {
  const input_test = await Deno.readTextFile('./day_3/input_test.txt');
  const line1 = input_test.split('\n')[0]
  const result = splitContent(line1)
  assertEquals(findKey(result), 'p');
});

Deno.test("Determine value of char", () => {
  assertEquals(valueOfKey('A'), 27)
  assertEquals(valueOfKey('a'), 1)
  assertEquals(valueOfKey('c'), 3)
  assertEquals(valueOfKey('Z'), 52)
})

Deno.test("Result Day 3 Part A", async () => {
  const input_test = await Deno.readTextFile('./day_3/input.txt');
  const result = gameResultPartA(input_test)
  assertEquals(result, 8252);
});

Deno.test("Result Day 3 Part B Test", async () => {
  const input_test = await Deno.readTextFile('./day_3/input_test.txt');
  const result = gameResultPartB(input_test)
  assertEquals(result, 70);
});

Deno.test("Result Day 3 Part B", async () => {
  const input_test = await Deno.readTextFile('./day_3/input.txt');
  const result = gameResultPartB(input_test)
  assertEquals(result, 2828);
});
