const input_test = await Deno.readTextFile('./day_11/input.txt');

const divisors: number[]= []
type Monkey = {
  id: number;
  items: number[];
  operation: (it: number) => number;
  test: (it: number) => number;
  activity: number
}

const parseInputFile = (input: string): Monkey[] => {

  const monkeys: Monkey[]= []
  for(const line of input.split('\n\n')) {
    const parts = line.split('\n')
    const id = Number(parts[0].split(' ')[1].split('')[0])
    const items = parts[1].split(':')[1].split(',').map(Number)
    const operation = parseOperation(parts[2])
    const test = parseTest(line)
    monkeys.push({
      id,
      items,
      operation,
      test,
      activity: 0
    })
  }
  return monkeys
}

const parseOperation = (line: string): ((it: number) => number) => {
  const operation = line.split(':')[1]
  const operationToApply = operation.split('=')[1]
  const operant = operationToApply.split(' ')[2]
  const num = Number(operationToApply.split(' ')[3])
  switch(operant) {
    case '*': return isNaN(num) ? (it: number) => it*it : (it: number) => it* num
    case '+': return isNaN(num) ? (it: number) => it*it : (it: number) => it+ num
  }
  throw "Could not parse"
}

const parseTest = (block: string): ((it: number) => number) => {
  const lines = block.split('\n')
  const divisor = Number(lines[3].split(' ')[5])
  divisors.push(divisor)
  const nextTrue = Number(lines[4].split(' ')[9])
  const nextFalse = Number(lines[5].split(' ')[9])
  return (it: number) => (it%divisor == 0 ? nextTrue : nextFalse)
}

const monkeys = parseInputFile(input_test)

const makeMove = (monkeys: Monkey[]) => {
  for(const monkey of monkeys) {
    while(monkey.items.length > 0) {
      const item = monkey.items.shift() as number
      const newItemValue = Math.floor(monkey.operation(item)/3)
      const nextMonkey = monkey.test(newItemValue)
      monkeys[nextMonkey].items.push(newItemValue)
      monkey.activity++
    }
  }
}

const MOD_CONSTAND = divisors.reduce((a, b) => a*b, 1) 
const makeMoveB = (monkeys: Monkey[]) => {
  for(const monkey of monkeys) {
    while(monkey.items.length > 0) {
      const item = monkey.items.shift() as number
      const newValue = monkey.operation(item)
      const nextValue = newValue%MOD_CONSTAND
      const nextMonkey = monkey.test(newValue)
      monkeys[nextMonkey].items.push(nextValue)
      monkey.activity++
    }
  }
}

// Part A
/*
for(let i =0; i< 20; i++) {
  makeMove(monkeys)
}
console.log(monkeys)
console.log(monkeys.sort((a, b) => b.activity - a.activity).slice(0, 2).reduce((a, b) => a * b.activity, 1))
*/

// Part B
for(let i = 0; i< 10000; i++) {
  makeMoveB(monkeys)
}
console.log(monkeys)
console.log(monkeys.sort((a, b) => b.activity - a.activity).slice(0, 2).reduce((a, b) => a * b.activity, 1))