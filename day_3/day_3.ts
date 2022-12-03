console.log('Day 3 ✨');

export const gameResultPartA = (fileContent: string) => {
  const lines = fileContent.split('\n');
  const gameValue = lines
    .map(splitContent)
    .map(findKey)
    .map(valueOfKey)
    .reduce((a, b) => a + b, 0);
  return gameValue;
};

export interface Line {
  partA: Set<string>; 
  partB: Set<string>;
  line: string
}

export const splitContent = (content: string): Line => {
  const middle = Math.floor(content.length / 2);
  const partA = content
    .substring(0, middle)
    .split('')
    .reduce((a, b) => {
      a.add(b)
      return a;
    }, new Set<string>());
  const partB = content
    .substring(middle)
    .split('')
    .reduce((a, b) => {
      a.add(b)
      return a;
    }, new Set<string>());
  return {
    partA,
    partB,
    line: content
  };
};

export const findKey = ({ partA, partB, line }: Line): string => {
  for (const key of partA) {
    if (partB.has(key)) {
      return key;
    }
  }
  throw `Coult not find key in both ${JSON.stringify({partA, partB})}, line: ${line}`
};

const findKeyInAllLines = (partA: Set<string>, partB: Set<string>, partC: Set<string>): string => {
  for (const key of partA) {
    if (partB.has(key) && partC.has(key)) {
      return key;
    }
  }
  throw `Coult not find key in both ${JSON.stringify({partA, partB, partC})}`
};

const mergeLine = (line: Line): Set<string> => {
  return new Set([...line.partA, ...line.partB])
}

function sliceIntoChunks(arr: string[], chunkSize: number): string[][] {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}


export const gameResultPartB = (fileContent: string): number => {
  const content = fileContent.split('\n')

  const chunks = sliceIntoChunks(content, 3)
  return chunks.map(it => {
    const lines = it.map(splitContent)
    .map(mergeLine)
    const key = findKeyInAllLines(lines[0], lines[1], lines[2])
    return valueOfKey(key)
  }).reduce((a, b) => a+b, 0)
}

const numberOfKey = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const valueOfKey = (key: string): number => {
  return numberOfKey.indexOf(key);
};
