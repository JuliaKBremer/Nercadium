import {Inject, Injectable} from '@angular/core';
import {ElectronAngularCommunicationService} from '../electron-angular-communication.service';
import {Observable} from 'rxjs';
import { DOCUMENT } from '@angular/common';
import {EventManager} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class HotkeyService {

  // Array to store all buttons that have been pressed before and give them a boolean if they currently pressed or not
  private indexKeyArray = [];

  // Array to store all currently pressed keys.
  private combinedKeys: Array<string> = [];

  private documentElement: HTMLElement;

  constructor(private communicationService: ElectronAngularCommunicationService,
              @Inject(DOCUMENT) private document: Document,
              private eventManager: EventManager) {

    this.documentElement = this.document.documentElement;

    // Called repeated if a key is pressed.
    this.eventManager.addEventListener(this.documentElement, 'keydown', (e) => this.onKeyDown(e));

    // Called once if a key is no more pressed
    this.eventManager.addEventListener(this.documentElement, 'keyup', (e) => this.onKeyUp(e));
  }

  public onKeyDown(event: KeyboardEvent) {
    const keyString: string = event.key;

    // Check if the key in the array.
    if (this.isKeyIndexed(keyString)) {
      // Check if the key is currently pressed.
      if (this.getKeyValue(keyString)) {
        return;
      } else {
        // Set set the value from key to true.
        this.setValue(keyString, true);
      }
    } else {
      // Add the no existing key to the array and set it to true.
      this.addKey(keyString);
    }

    // Filter all keys in the array and put all with true value in combinedKeys array.
    this.pressedKeys();

    // Send event to all listener to check the hotkeys.
    this.documentElement.dispatchEvent(new CustomEvent('Check-Hotkeys', {detail: this.combinedKeys}));
  }

  public onKeyUp(event: KeyboardEvent) {
    const keyString: string = event.key;

    // Set set the value from key to false.
    this.setValue(keyString, false);

    this.pressedKeys();
  }

  private isKeyIndexed(keyString: string): boolean {
    for (const index in this.indexKeyArray) {
      if (this.indexKeyArray[index].key === keyString) {
        return true;
      }
    }
    return false;
  }

  private getKeyValue(keyString: string): boolean {
    for (const index in this.indexKeyArray) {
      if (this.indexKeyArray[index].key === keyString) {
        return this.indexKeyArray[index].value;
      }
    }
    return false;
  }

  private addKey(keyString: string) {
    this.indexKeyArray.push({key: keyString, value: true});
  }

  private setValue(keyString: string, value: boolean) {
    for (const index in this.indexKeyArray) {
      if (this.indexKeyArray[index].key === keyString) {
        this.indexKeyArray[index].value = value;
      }
    }
  }

  private pressedKeys() {
    this.combinedKeys = this.indexKeyArray
      .filter(keyValuePair => keyValuePair.value)
      .map(keyValuePair => keyValuePair.key);
  }

  // Get a observable from a eventlistener. If the event is triggered, it will check the current pressed keys and the inquire keys.
  public addShortcut(keys: string[]): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.eventManager.addEventListener(this.documentElement, 'Check-Hotkeys', (el) => {
        if (keys.length === el.detail.length) {
          if (keys.every(key => el.detail.includes(key))) {
            observer.next(true);
          }
        }
      });
    });
  }
}
