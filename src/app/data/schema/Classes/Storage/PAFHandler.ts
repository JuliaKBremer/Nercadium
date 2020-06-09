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
import {IStorageLoad} from '../../Interfaces/storage/IStorageLoad';


export class PAFHandler {

  tempFile: object = null;
  public event: Event = new Event('Loaded');

  constructor(private FileAccessService: StorageSystemService) { }

  public eventHandler(e) {
    console.log('The time is: ' + e.detail);
  }

  // Speichert die übergebene PAF-Datei unter dem angegeben Ort ab.
  // Dabei Differenzieren zwischen FilePath und dem FilePath der PAF-Datei selbst
  // um so einen relativen Dateipfad bilden zu können.
  public SavePAFile(file: PAFile, filePath: string): boolean {
    const revtal = false;
    if (file != null) {
      const storageFile = new StorageFile();
      storageFile.Name = file.Name;
      storageFile.Description = file.Description;
      storageFile.fileName = file.fileName;
      storageFile.filePath = filePath;
      storageFile.fileData = file;
      console.log('Saving: ' + storageFile.filePath);
      console.log('Saving: ' + storageFile.fileName);
      this.FileAccessService.saveData(storageFile);
    }
    return revtal;
  }



  public Load<T>(filePath: string, filename: string) {
    const storageFile = new StorageFile();
    storageFile.fileName = 'main.paf';
    storageFile.filePath = filePath + '/' + filename ;
  }

  // Lädt aus dem angegebenen Pfad und Paketnamen eine PAF-Datei
  // und gibt diese zurück.
  public LoadPAFFile(filePath: string, packageName: string) {
    this.Load(filePath, packageName);
    // let aaf: PAFEntry[] = null as PAFEntry[];
    const storageFile = new StorageFile();
    storageFile.fileName = 'main.paf';
    storageFile.filePath = filePath + '/' + packageName ;

    const loadedFile = this.FileAccessService.loadData(storageFile)
      .then( (response) => {
        const result = (response as PAFile);
        if (result != null) {
          const pafEntries: PAFEntry[] = [];
          for (const entry of result.Entries) {
            console.log(entry.type);
            pafEntries.push(entry);
          }
          return pafEntries;
        }
    });

    return loadedFile;
  }


}
