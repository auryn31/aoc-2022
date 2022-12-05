
export const gameResultPartA = (fileContent: string): string => {
  const parts = fileContent.split('\n\n')
  let stacks = parseStacks(parts[0])
  const moves = parts[1].split('\n').map(parseMove)
  for(const move of moves) {
    stacks = makeMove(stacks, move)
  }
  let result = ''
  for(const stack of stacks) {
    result += stack.shift()
  }
  return result
};

export const makeMove = (stacks: string[][], move: {amount: number, from: number, to: number}): string[][] => {
  for(let i = 0; i < move.amount; i++ ) {
    const value = stacks[move.from].shift() 
    if(typeof value !== 'string') {
      throw 'Error during shift'
    }
    if(stacks[move.to] === undefined) {
      stacks[move.to] = [value]
    } else {
      stacks[move.to] = [value, ...stacks[move.to]]
    }
  }
  return stacks
}
 
export const parseMove = (line: string) : {amount: number, from: number, to: number} => {
  const values = line.split(' ');
  const amount = parseInt(values[1])
  const from = parseInt(values[3])-1
  const to = parseInt(values[5])-1
  return {from, to, amount}
}

export const parseStacks = (content: string): string[][] => {
  const lines = content.split('\n')
  const stacks: string[][] = []
  for(const line of lines) {
    const lineParts = line.split('')
    for(let i = 0; i < lineParts.length; i++) {
      if(lineParts[i] === '[') {
        if(stacks[i%3] !== undefined) {
          stacks[i%3] = [...stacks[i%3], lineParts[i+1]]
        } else {
          stacks[i%3] = [lineParts[i+1]]
        }
      }
    }
  }
  return stacks
}