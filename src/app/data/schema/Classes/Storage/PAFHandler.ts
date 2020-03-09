// Mirco Hölzenbein, FEB. 17, 20
// PAFHandler - PackageAllocationFileHandler
// Verwaltet / Wertet Informationen zu einer PAFile (PackageAllocationFile) aus,
// um so die Objektverweise auf die JSON-Dateien ausfindig zu machen.

import {PAFile} from './PAFile';
import {StorageSystemService} from '../../../../core/service/storageSystem/storage-system.service';
import {StorageFile} from './StorageFile';
import {IBaseGameEntity} from '../../Interfaces/Editor/IBaseGameEntity';
import {Type} from '@angular/compiler';
import {PAFEntry} from './PAFEntry';

export class PAFHandler {


  constructor(private FileAccessService: StorageSystemService) {

  }

  public SavePAFile(file: PAFile): boolean {
    const revtal = false;
    if (file != null) {
      const storageFile = new StorageFile();
      storageFile.Name = file.Name;
      storageFile.Description = file.Description;
      storageFile.fileName = file.fileName;
      storageFile.filePath = file.filePath;
      storageFile.fileData = file;
      this.FileAccessService.saveData(storageFile);
    }
    return revtal;
  }

  public LoadPAFile<T>(filePath: string, filename: string): PAFile {
    const storageFile = new StorageFile();
    storageFile.fileName = filename;
    storageFile.filePath = filePath;
    // tslint:disable-next-line:prefer-const
    let fileResult = null;

    const pr = new Promise((resolve, reject) => {
      this.FileAccessService.loadData(storageFile).then(
        result => {
          fileResult  = result.data;
          resolve();
        });
    });

    return fileResult;
  }

}
