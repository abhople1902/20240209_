const path = require("path");
const readline = require("readline");


const {
  createDirectory,
  createFile,
  createSchema,
  readJsonFile,
  updateDirectoryName,
  updateFileName,
  deleteFile,
  deleteFolder,
  appendSchema,
  updateJsonKeys,
  updateJsonValues,
  rl,
  DirFlag,
  fileFlag,
  directoryPath,
  newDirname,
  mainDirPath
} = require("./myDatabase");



////////////////////////////////////////////////////////////////////////
// Main

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

let exitLoop = false;

function printOptions() {
  console.log("Options:");
  console.log("Create Directory - 1");
  console.log("Create new file - 2");
  console.log("Create and write new schema - 3");
  console.log("Updating Directory name - 4");
  console.log("Updating file name - 5");
  console.log("Deleting folder - 6");
  console.log("Deleting file - 7");
  console.log("Updating File content by appending - 8");
  console.log("Updating keys - 9");
  console.log("Updating values - 10");
  console.log("Read file - 11");
}

printOptions()
console.log("\n")

rl.on('line', (input) => {

  printOptions()
  console.log("\n")

  switch (input.trim()) {
    case '1':
      console.log("Creating directory...");
      createDirectory(directoryPath);
      break;
    case '2':
      if(DirFlag){
        createFile(newDirname, "test.json")
      } else {
        createFile(directoryPath, "test.json")
      }
      break;
    case '3':
      console.log("Creating the schema and writing to file...");
      createSchema();
      break;
    case '4':
      console.log("Updating Directory")
      updateDirectoryName(directoryPath, newDirname)
      DirFlag = true
      break;
    case '5':
      console.log("Updating file name")
      if(DirFlag){
        updateFileName(mainDirPath + newDirname +'/test.json', "newTest.json")
        fileFlag = true
      } else {
        updateFileName(directoryPath+'/test.json', "newTest.json")
        fileFlag = true
      }
      break;
    case '6':
      console.log("Deleting file")
      if(DirFlag && fileFlag){
        deleteFile(mainDirPath+newDirname, directoryPath + '/newTest.json')
      } else {
        deleteFile(directoryPath, directoryPath + 'test.json')
      }
      break;
    case '7':
      console.log("Deleting folder")
      if(DirFlag){
        deleteFolder(mainDirPath+newDirname)
      } else {
        deleteFolder(directoryPath)
      }
      break;
    case '8':
      console.log("Updating file content by appending")
      appendSchema()
      break;
    case '9':
      console.log("Updating keys")
      updateJsonKeys(directoryPath + '/test.json', { "name": "newName" })
      break;
    case '10':
      console.log("Updating values")
      updateJsonValues(directoryPath + '/test.json', { "name": { "value": "newName" } })
      break;
    case '11':
      console.log("Reading file")
      const jsonData = readJsonFile(directoryPath + '/test.json');
      if (jsonData) {
        console.log(jsonData);
      } else {
        console.log('Error reading JSON file.');
      }
      break;
    case "exit":
      console.log("Exiting the loop...");
      exitLoop = true;
      rl.close();
      break;
    default:
      console.log("Unknown command. Please try again.");
      break;
  }

  if (exitLoop) {
    rl.close();
  }
});