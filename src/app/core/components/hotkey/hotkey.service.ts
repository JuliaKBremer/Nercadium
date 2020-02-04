import { Injectable } from '@angular/core';
import {ElectronAngularCommunicationService} from "../../service/electron-angular-communication.service";

@Injectable({
  providedIn: 'root'
})
export class HotkeyService {

  constructor(private communicationService: ElectronAngularCommunicationService) {
  }

  private indextKeyArray: {[key: string]: boolean} = {};

  public onKeyDown(event: KeyboardEvent){
    if (this.indextKeyArray[event.key] === undefined || this.indextKeyArray[event.key] === false)
      this.indextKeyArray[event.key] = true;
    else
      return;

    //TODO in externem script auslagern
    if (event.key === 'F12')
      this.communicationService.sendEvent('open-close-devTools');

    // Keycombinations
    // if (event.key !== 'Control' && this.indextKeyArray['Control'] === true)
    //   console.log('Control+' + event.key);
  }

  public onKeyUp(event: KeyboardEvent) {
    if (this.indextKeyArray[event.key] === true)
      this.indextKeyArray[event.key] = false;
  }
}
