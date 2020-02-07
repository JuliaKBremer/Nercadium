# Hotkey

Example
````

import { Component, OnInit, OnDestroy } from '@angular/core';
import {HotkeyService} from '.../core/service/hotkey/hotkey.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(private hotkeyService: HotkeyService) {
  }

  ngOnInit() {
    this.subscription = this.hotkeyService.addShortcut(['a']).subscribe(e => console.log(e));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

````

## Initiate Shortcut
1. Inject HotkeyService in constructor.
2. Add shortcut with addShortcut() in constructor or in ngOnInit.

## AddShortcut
AddShortcut need a string[] like ['a'] for single key or ['s', 'Control', ...] for keycombination.
Every string stands for a key.
[Valid KeyValues](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

AddShortcut returns a Observable.
The subscription returned true when the queried key or keycombination is pressed.

Dont forget to unsubscribe!
