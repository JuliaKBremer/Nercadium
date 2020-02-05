import { Injectable } from '@angular/core';
import {ElectronAngularCommunicationService} from '../../../../core/service/electron-angular-communication.service';

@Injectable({
  providedIn: 'root'
})
export class MinMaxCloseService {

  constructor(private communicationService: ElectronAngularCommunicationService ) {
  }

  public CloseWindow() {
    this.communicationService.sendEvent('close-window');
  }

  public MinimizeWindow() {
    this.communicationService.sendEvent('minimize-window');
  }

  public MaximizeWindow() {
    this.communicationService.sendEvent('maximize-window');
  }

  public UnmaximizeWindow() {
    this.communicationService.sendEvent('unmaximize-window');
  }
}
