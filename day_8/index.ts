const input_test = await Deno.readTextFile('./day_8/input.txt');
const isVisible =
  (matrix: number[][]) =>
  (position: number[]): boolean => {
    if (position[0] == 0 || position[0] == matrix[0].length - 1) {
      return true;
    }
    if (position[1] == 0 || position[1] == matrix[1].length - 1) {
      return true;
    }
    const treeHeight = matrix[position[0]][position[1]];
    let isVisible = true;
    for (let x = 0; x < position[1]; x++) {
      if (matrix[position[0]][x] >= treeHeight) {
        isVisible = false;
      }
    }
    if (isVisible) {
      return isVisible;
    }
    isVisible = true;
    for (let x = position[1] + 1; x < matrix.length; x++) {
      if (matrix[position[0]][x] >= treeHeight) {
        isVisible = false;
      }
    }
    if (isVisible) {
      return isVisible;
    }

    isVisible = true;
    for (let y = position[0] + 1; y < matrix[0].length; y++) {
      if (matrix[y][position[1]] >= treeHeight) {
        isVisible = false;
      }
    }
    if (isVisible) {
      return isVisible;
    }
    isVisible = true;
    for (let y = 0; y < position[0]; y++) {
      if (matrix[y][position[1]] >= treeHeight) {
        isVisible = false;
      }
    }
    if (isVisible) {
      return isVisible;
    }
    return isVisible;
  };

const countVisible =
  (matrix: number[][]) =>
  (position: number[]): number => {
    if (position[0] == 0 || position[0] == matrix[0].length - 1) {
      return 0;
    }
    if (position[1] == 0 || position[1] == matrix[1].length - 1) {
      return 0;
    }

    const treeHeight = matrix[position[0]][position[1]];
    let visibleTrees1 = 0;
    for (let x = position[1] - 1; x >= 0; x--) {
      visibleTrees1++;
      if (matrix[position[0]][x] >= treeHeight) {
        break;
      }
    }
    let visibleTrees2 = 0;
    for (let x = position[1] + 1; x < matrix.length; x++) {
      visibleTrees2++;
      if (matrix[position[0]][x] >= treeHeight) {
        break;
      }
    }
    let visibleTrees3 = 0;
    for (let y = position[0] + 1; y < matrix[0].length; y++) {
      visibleTrees3++;
      if (matrix[y][position[1]] >= treeHeight) {
        break;
      }
    }
    let visibleTrees4 = 0;
    for (let y = position[0] - 1; y >= 0; y--) {
      visibleTrees4++;
      if (matrix[y][position[1]] >= treeHeight) {
        break;
      }
    }
    return visibleTrees1 * visibleTrees2 * visibleTrees3 * visibleTrees4;
  };

const mapMatrix = (input: string): number[][] => {
  const numbers: number[][] = [];
  for (const line of input.split('\n')) {
    numbers.push(line.split('').map(Number));
  }
  return numbers;
};
const numberMap = mapMatrix(input_test);
const treeIsVisible = isVisible(numberMap);
const countVisibleTrees = countVisible(numberMap);
let visibleTrees = 0;
let mostVisibleTrees = 0;
for (let i = 0; i < numberMap.length; i++) {
  for (let j = 0; j < numberMap[i].length; j++) {
    const visibleFromTree = countVisibleTrees([i, j]);
    if (visibleFromTree > mostVisibleTrees) {
      mostVisibleTrees = visibleFromTree;
    }
    if (treeIsVisible([i, j])) {
      visibleTrees++;
    }
  }
}
console.log(`Visible fields: ${visibleTrees}`);
console.log(`Most visible trees: ${mostVisibleTrees}`);
