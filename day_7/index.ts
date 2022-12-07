
const input_test = await Deno.readTextFile('./day_7/input.txt');
type File = {
  size: number;
  name: string;
}
type Folder = {
  parent: Folder | undefined;
  name: string;
  folders: Folder[];
  files: File[];
}

const root: Folder = {
  parent: undefined,  
  name: '/',
  folders: [],
  files: []
}

const parseStructure = (lines: string) => {
  let inList = false;
  let currentFolder: Folder = {parent: undefined, name: '', folders: [root], files: []};
  for(const line of lines.split('\n')) {
    if(inList && !line.startsWith('dir') && !line.startsWith('$')) {
      const parts = line.split(' ')
      const fileSize = parseInt(parts[0])
      const fileName = parts[1]
      currentFolder.files = [...currentFolder.files, {name: fileName, size: fileSize}]
    }
    if(line.startsWith('$ ls')) {
        inList = true;
    }
    if(line.startsWith('$ cd')) {
      inList = false;
    }
    if(line.startsWith('dir')) {
      const dirName = line.split(' ')[1]
      currentFolder.folders = [...currentFolder.folders, {name: dirName, parent: currentFolder, folders: [], files: []}]
    }
    if(line === '$ cd ..') {
      if(!currentFolder.parent) {
        throw 'Could not cd out of parent'
      }
      currentFolder = currentFolder.parent;
    }
    if(line.startsWith('$ cd') && !line.includes('..')) {
      const dirName = line.split(' ')[2]
      const folderToMoveTo = currentFolder.folders.filter(it => it.name === dirName)
      if(folderToMoveTo.length !== 1) {
        throw 'Could not move into folder ' + dirName
      }
      currentFolder = folderToMoveTo[0]
    }
  }
}

parseStructure(input_test)

const allFileSizes: number[] = []

const findDirectorySize = (folder: Folder): number => {
  let filesSize = folder.files.map(it => it.size).reduce((a, b) => a+b, 0)
  if(folder.folders.length > 0) {
    filesSize= filesSize + folder.folders.map(findDirectorySize).reduce((a, b) => a+b, 0)   
  }
  if(filesSize < 100000) {
    allFileSizes.push(filesSize)      
  }
  return filesSize
}
const usedSize = findDirectorySize(root)
console.log(`Result Part A: ${allFileSizes.reduce((a, b) => a+b, 0)}`)

const spaceNeeded = Math.abs(70000000 - 30000000 - usedSize)

const directoriesToDelete: number[] = []
const findDeletableDirectories = (folder: Folder): number => {
  let filesSize = folder.files.map(it => it.size).reduce((a, b) => a+b, 0)
  if(folder.folders.length > 0) {
    filesSize = filesSize + folder.folders.map(findDeletableDirectories).reduce((a, b) => a+b, 0)   
  }
  if(filesSize > spaceNeeded) {
    directoriesToDelete.push(filesSize)      
  }
  return filesSize
}
findDeletableDirectories(root)
directoriesToDelete.sort((x,y) => x-y)
console.log(`Result Part B: ${directoriesToDelete[0]}`)