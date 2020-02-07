import { Injectable } from '@angular/core';
import {ElectronAngularCommunicationService} from '../electronAngularCommunication/electron-angular-communication.service';
import {IStorageSave} from '../../../data/schema/Interfaces/storage/IStorageSave';
import {IStorageLoad} from '../../../data/schema/Interfaces/storage/IStorageLoad';
import {IStorageRename} from '../../../data/schema/Interfaces/storage/IStorageRename';
import {IStorageDelete} from '../../../data/schema/Interfaces/storage/IStorageDelete';
import {IStorageAppend} from '../../../data/schema/Interfaces/storage/IStorageAppend';

@Injectable({
  providedIn: 'root'
})
export class StorageSystemService {

  constructor(private communicationService: ElectronAngularCommunicationService) {
  }

  public saveData(data: IStorageSave) {
    this.communicationService.sendEvent('save-data', data);
  }

  public loadData(data: IStorageLoad): Promise<any> {
    return this.communicationService.invokeEvent('load-data', data);
  }

  public renameData(data: IStorageRename) {
    this.communicationService.sendEvent('rename-data', data);
  }

  public deleteData(data: IStorageDelete) {
    this.communicationService.sendEvent('delete-data', data);
  }

  public appendText(data: IStorageAppend) {
    this.communicationService.sendEvent('append-text', data);
  }
}
