export const gameResultPartA = (fileContent: string): number => {
  return fileContent.split('\n').map(parseLine).filter(oneContainsOther).length
};

export const gameResultPartB = (fileContent: string): number => {
  return fileContent.split('\n').map(parseLine).filter(oneOverlapsOther).length
};

export const oneContainsOther = (line: number[][]): boolean => {
  // left is contained by right
  if(line[0][0] >= line[1][0] && line[0][1] <= line[1][1]) {
    return true
  }
  // right is contained by left
  if(line[1][0] >= line[0][0] && line[1][1] <= line[0][1]) {
    return true
  }
  return false
}

export const oneOverlapsOther = (line: number[][]): boolean => {
  // one contains other
  if(oneContainsOther(line)) {
    return true
  }
  if(line[0][1] >= line[1][0] && line[0][1] <= line[1][1]) {
    return true
  }
  if(line[1][1] >= line[0][0] && line[1][1] <= line[0][1]) {
    return true
  }
  return false
}

export const parseLine = (line: string): number[][] => {
  return line.split(',').map((it) => it.split('-').map((it) => parseInt(it)));
};
