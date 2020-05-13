import { Injectable } from '@angular/core';
import {ElectronAngularCommunicationService} from '../electronAngularCommunication/electron-angular-communication.service';
import {IConfigSave} from '../../../data/schema/Interfaces/Config/IConfigSave';
import {IConfigLoad} from '../../../data/schema/Interfaces/Config/IConfigLoad';

@Injectable({
  providedIn: 'root'
})
export class ConfigManagerService {

  constructor(private communicationService: ElectronAngularCommunicationService) { }

  public saveConfig(data: IConfigSave) {
    this.communicationService.sendEvent('save-config', data);
  }

  public loadConfig(data: IConfigLoad): Promise<any> {
    return this.communicationService.invokeEvent('load-config', data);
  }
}
