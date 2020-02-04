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
    if(!fs.existsSync(filePath))
      fs.mkdirSync(filePath, {recursive: true});

    fs.writeFile(path.join(filePath, fileName), JSON.stringify(fileData, null, 2), (err) => {
      if(err) throw err;
      console.log('saved');
    });
  }

  appendData(filePath, fileName, fileText) {
    if(!fs.existsSync(filePath))
      fs.mkdirSync(filePath, {recursive: true});

    fs.appendFile(path.join(filePath, fileName), fileText + '\n', (err) => {
      if (err) throw err;
      console.log('append data to file');
    })
  }

  renameData(filePath, oldFileName, newFileName) {
    let oldFile = path.join(filePath, oldFileName);
    let newFile = path.join(filePath, newFileName);
    fs.rename(oldFile, newFile, (err) => {
      if (err) throw err;
      console.log('file renamed');
    });
  }

  deleteData(filePath, fileName) {
    fs.unlink(path.join(filePath, fileName), (err) => {
      if (err) throw err;
      console.log('delet file');
    })
  }
}

module.exports = Storage;
