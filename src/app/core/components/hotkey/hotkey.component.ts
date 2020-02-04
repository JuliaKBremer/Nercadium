import { Component } from '@angular/core';
import {HotkeyService} from "./hotkey.service";

@Component({
  selector: 'app-hotkey',
  templateUrl: './hotkey.component.html',
  styleUrls: ['./hotkey.component.css'],
  host: {
    '(document:keydown)': 'onKeyDown($event)',
    '(document:keyup)': 'onKeyUp($event)'
  }
})

export class HotkeyComponent {
  $event: KeyboardEvent;

  constructor(private hotkeyService: HotkeyService) { }


  onKeyDown(event: KeyboardEvent) {
    this.hotkeyService.onKeyDown(event);
  }

  onKeyUp(event: KeyboardEvent) {
    this.hotkeyService.onKeyUp(event);
  }
}
