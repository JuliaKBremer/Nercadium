const path = require('path');
const fs = require('fs');

class Storage {

  readData(filePath, fileName, defaultData) {
    let rawData;
    let obj;

    try {
      rawData = fs.readFileSync(path.join(filePath, fileName));
      obj = JSON.parse(rawData);
      console.log('load data');
      return obj;
    } catch (e) {
      if (defaultData === undefined){
        console.log('nothing loaded');
        return undefined;
      }
      else {
        console.log('load default');
        return defaultData;
      }
    }
  }

  writeData(filePath, fileName, fileData) {
    this.checkDirPathAndCreate(filePath);

    fs.writeFile(path.join(filePath, fileName), JSON.stringify(fileData, null, 2), (err) => {
      if(err) throw err;
    });
  }

  appendData(filePath, fileName, fileText) {
    this.checkDirPathAndCreate(filePath);

    fs.appendFile(path.join(filePath, fileName), fileText + '\n', (err) => {
      if (err) throw err;
    })
  }

  renameData(filePath, oldFileName, newFileName) {
    let oldFile = path.join(filePath, oldFileName);
    let newFile = path.join(filePath, newFileName);
    fs.rename(oldFile, newFile, (err) => {
      if (err) throw err;
    });
  }

  deleteData(filePath, fileName) {
    fs.unlink(path.join(filePath, fileName), (err) => {
      if (err) throw err;
    })
  }

  // Checking the path from directory, if it no exist it creat the directory.
  checkDirPathAndCreate(filePath) {
    if(!fs.existsSync(filePath))
      fs.mkdirSync(filePath, {recursive: true});
  }
}

module.exports = Storage;
