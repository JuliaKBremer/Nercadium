# Storage System

Example
````

import { Component } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {

  constructor(private storageSystemService: StorageSystemService) { }

  save() {
    this.storageSystemService.saveData({
          filePath: 'C:\\Users\\timom\\AppData\\Roaming\\Nercadium',
          fileName: 'test.json',
          fileData: {a: 1, b: 'asd'}
    });
  }

  load() {
    this.storageSystemService.loadData({
          filePath: 'C:\\Users\\timom\\AppData\\Roaming\\Nercadium',
          fileName: 'test.json'
    }).then(loadetData => console.log(loadetData));
  }

  rename() {
    this.storageSystemService.renameData({
      filePath: 'C:\\Users\\timom\\AppData\\Roaming\\Nercadium',
      oldFileName: 'test.json',
      newFileName: 'wulleWulle.json'
    }));
  }
  
  delete() {
    this.storageSystemService.deleteData({
      filePath: 'C:\\Users\\timom\\AppData\\Roaming\\Nercadium',
      fileName: 'test.json'
    }));
  }

  append() {
    this.storageSystemService.appendText({
      filePath: 'C:\\Users\\timom\\AppData\\Roaming\\Nercadium',
      fileName: 'log.txt',
      text: 'wub wub'
    }));
  }

}

````

## saveData
````
saveData(data: IStorageSave);
````
Save the fileData object with the fileName in the filePath.
If the file not exist it will be created.
If it exist the file will be overwritten.
If the folder not exist it will be created.

### IStorageSave
````
export interface IStorageSave {
  filePath: string;
  fileName: string;
  fileData: object;
}
````
## loadData
````
loadData(data: IStorageLoad): Promise<any>;
````
LoadData return a promise and results when the data is done loading.
Load the file with the name fileName in the filePath.
If there no file to load it return a undefined.

### IStorageLoad
````
export interface IStorageLoad {
  filePath: string;
  fileName: string;
}
````
## RenameData
````
renameData(data: IStorageRename);
````
RenameData change the filename from the oldFileName to the newFileName.

### IStorageRename
````
export interface IStorageRename {
  filePath: string;
  oldFileName: string;
  newFileName: string;
}
````
## DeleteData
````
deleteData(data: IStorageDelete);
````
Delete the file with the fileName in the filePath.
### IStorageDelete
````
export interface IStorageDelete {
  filePath: string;
  fileName: string;
}
````
## AppendData
````
appendData(data: IStorageAppend);
````
Append the text on the end of a file named fileName in the filePath.
If the file not exist it will be created.
If the folder not exist it will be created.
### IStorageAppend
````
export interface IStorageAppend {
  filePath: string;
  fileName: string;
  text: string;
}
````
