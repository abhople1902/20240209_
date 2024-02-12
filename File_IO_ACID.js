// import { mkdir } from 'fs';
const fs = require('fs');
const path = require('path');

// Function to create a directory
function createDirectory(testDir) {
  fs.mkdir(testDir, { recursive: true }, (err) => {
    if (err) {
      console.error(`Error creating directory: ${err}`);
    } else {
      console.log(`Directory '${testDir}' created successfully.`);
    }

    });
  }


  function createFile(testDir, fileName) {
    const filePath = path.join(testDir, fileName);
  fs.open(filePath, 'w', (err, fd) => {
    if (err) {
      console.error(`Error creating file: ${err}`);
    } else {
      fs.close(fd, (err) => {
        if (err) {
          console.error(`Error closing file: ${err}`);
        } else {
          console.log(`Empty file '${fileName}' created successfully in directory '${testDir}'.`);
        }
      });
    }
  });
  }


const directoryName = '/Users/abhople/Desktop/testDir/';
createDirectory(directoryName);
createFile('/Users/abhople/Desktop/testDir/', 'a.txt');