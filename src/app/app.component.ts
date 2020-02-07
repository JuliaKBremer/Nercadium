import { Component } from '@angular/core';
import {HotkeyService} from './core/service/hotkey/hotkey.service';
import {ElectronAngularCommunicationService} from './core/service/electronAngularCommunication/electron-angular-communication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private hotkeyService: HotkeyService, private communicationService: ElectronAngularCommunicationService) {
    this.setUpHotkeys();
  }

  private setUpHotkeys() {

    // Open and close browser DevTools.
    this.hotkeyService.addShortcut(['F12']).subscribe( () => this.communicationService.sendEvent('open-close-devTools'));

  }
}
