console.log('Day 3 ✨');

export const gameResult = (fileContent: string) => {
  const lines = fileContent.split('\n');
  const gameValue = lines
    .map(splitContent)
    .map(findKey)
    .map(valueOfKey)
    .reduce((a, b) => a + b, 0);
  return gameValue;
};

export interface IHash {
  [key: string]: number;
}
export interface Line {
  partA: IHash; 
  partB: IHash;
  line: string
}

export const splitContent = (content: string): Line => {
  const middle = Math.floor(content.length / 2);
  const partA = content
    .substring(0, middle)
    .split('')
    .reduce((a: IHash, b) => {
      a[b] = 1;
      return a;
    }, {});
  const partB = content
    .substring(middle)
    .split('')
    .reduce((a: IHash, b) => {
      a[b] = 1;
      return a;
    }, {});
  return {
    partA,
    partB,
    line: content
  };
};

export const findKey = ({ partA, partB, line }: Line): string => {
  for (const key of Object.keys(partA)) {
    if (key in partB) {
      return key;
    }
  }
  throw `Coult not find key in both ${JSON.stringify({partA, partB})}, line: ${line}`
  // return '0'
};

const numberOfKey = '0abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const valueOfKey = (key: string): number => {
  return numberOfKey.indexOf(key);
};
