// Description: File I/O operations using Node.js

//Current bug - let the user decide the update parameters
//              make cases 6 and 7 more robust
//              The file name not getting updated properly when directory name is updated; new file in one level up is created
const fs = require('fs');
const path = require('path');

const mainDirPath = '/Users/abhople/Documents/20240209_/';
const directoryPath = '/Users/abhople/Documents/20240209_/testDir';
const newDirname = 'newtestDir';
let DirFlag = false
let fileFlag = false




/**
 * Function to check if a directory exists
 * @param {String} directoryPath
 * @return {Boolean}
*/
function directoryExists(directoryPath) {
  try {
    return fs.statSync(directoryPath).isDirectory();
  } catch (err) {
    return false;
  }
}

/**
 * Function to check if file exists
 * @param {String} filePath 
 * @returns {Boolean}
 */
function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch (err) {
    return false;
  }
}


////////  CREATE OPERATIONS
/**
 * Function to create a directory
 * @param {String} directoryPath 
 * @returns {void}
 */
function createDirectory(directoryPath) {
  if (directoryExists(directoryPath)) {
    console.log(`Directory '${directoryPath}' already exists.`);
  } else {
    fs.mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        console.error(`Error creating directory: ${err}`);
      } else {
        console.log(`Directory '${directoryPath}' created successfully.`);
      }
    });
  }
}

/**
 * Function to create an empty file inside a directory
 * @param {String} directoryPath 
 * @param {String} fileName 
 * @returns {void}
 */
function createFile(directoryPath, fileName) {
  const filePath = path.join(directoryPath, fileName);
  if (fileExists(filePath)) {
    console.log(`File '${fileName}' already exists in directory '${directoryPath}'.`);
  } else {
    fs.open(filePath, 'w', (err, fd) => {
      if (err) {
        console.error(`Error creating file: ${err}`);
      } else {
        fs.close(fd, (err) => {
          if (err) {
            console.error(`Error closing file: ${err}`);
          } else {
            console.log(`Empty file '${fileName}' created successfully in directory '${directoryPath}'.`);
          }
        });
      }
    });
  }
}



/**
 * 
 * Function to prompt user for JSON schema input
 */
function promptForSchema() {
  return new Promise((resolve, reject) => {
    rl.question('Please enter the JSON schema: ', (input) => {
      try {
        const schema = JSON.parse(input);
        resolve(schema);
      } catch (error) {
        reject('Invalid JSON schema. Please try again.');
      }
    });
  });
}

// Function to create JSON schema (file content)
async function createSchema() {
  try {
    const schema = await promptForSchema();
    let schemaFilePath = ""
    // Save the schema to a JSON file
    if(fileFlag){
      if(DirFlag){
        schemaFilePath = mainDirPath + newDirname + '/newTest.json';
      } else {
        schemaFilePath = directoryPath + '/newTest.json';
      }
    } else {
      if(DirFlag){
        schemaFilePath = mainDirPath + newDirname + '/test.json';
      } else {
        schemaFilePath = directoryPath + '/test.json';
      }
    }
    fs.writeFileSync(schemaFilePath, JSON.stringify(schema, null, 2));

    console.log(`Schema successfully created and saved to ${schemaFilePath}`);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Schema written")
  }
}













/////////////// UPDATE OPERATION
/**
 * Updating directory name
 * @param {String} directoryPath 
 * @param {String} newDirName 
 * @returns {void}
 */
function updateDirectoryName(directoryPath, newDirName) {
  fs.renameSync(directoryPath, newDirName);
  console.log(`Directory name updated to ${newDirName}`);
}

/**
 * updating file name
 * @param {String} existingFilePath 
 * @param {String} newFileName 
 * @returns {void}
 */
function updateFileName(existingFilePath, newFileName) {
  fs.renameSync(existingFilePath, newFileName);
  console.log(`File name updated to ${newFileName}`);
}



/**
 * Updating file content
 * Appending in the file
 * @param {String} filePath
 * @param {String} content
 * @returns {void}
 */
async function appendSchema() {
  try {
    const schema = await promptForSchema();
    let schemaFilePath = ""
    // Save the schema to a JSON file
    if(fileFlag){
      if(DirFlag){
        schemaFilePath = mainDirPath + newDirname + '/newTest.json';
      } else {
        schemaFilePath = directoryPath + '/newTest.json';
      }
    } else {
      if(DirFlag){
        schemaFilePath = mainDirPath + newDirname + '/test.json';
      } else {
        schemaFilePath = directoryPath + '/test.json';
      }
    }
    fs.appendFileSync(schemaFilePath, JSON.stringify(schema, null, 2));

    console.log(`Schema successfully updated and saved to ${schemaFilePath}`);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Schema written")
  }
}



//////////////// DELETION OPERATION
/**
 * Deletes a file from the specified directory
 * @param {String} directoryPath 
 * @param {String} fileName
 * return {void}
 */
function deleteFile(directoryPath, fileName) {
  const filePath = path.join(directoryPath, fileName);
  if (fileExists(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log(`File '${fileName}' deleted successfully from directory '${directoryPath}'.`);
      }
    });
  } else {
    console.log(`File '${fileName}' does not exist in directory '${directoryPath}'.`);
  }
}



function deleteFolder(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file, index) => {
      const curPath = `${folderPath}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolder(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
    console.log(`Folder ${folderPath} deleted successfully.`);
  } else {
    console.log(`Folder ${folderPath} does not exist.`);
  }
}









////////////////////////////////////////////////////////////////////////
// Main

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let exitLoop = false;

function printOptions() {
  console.log("Options:");
  console.log("Create Directory - 1");
  console.log("Create new file - 2");
  console.log("Create and write new schema (can be also used for updating) - 3");
  console.log("Updating File content by appending - 8");
  console.log("Updating Directory name - 4");
  console.log("Updating file name - 5");
  console.log("Deleting folder - 6");
  console.log("Deleting file - 7");
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
    case '7':
      console.log("Deleting folder")
      if(DirFlag){
        deleteFolder(mainDirPath+newDirname)
      } else {
        deleteFolder(directoryPath)
      }
    case '8':
      console.log("Updating file content by appending")
      appendSchema()
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
