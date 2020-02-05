import { Component, OnInit } from '@angular/core';
import {HotkeyService} from '../../../../core/service/hotkey/hotkey.service';

@Component({
  selector: 'app-editor-start',
  templateUrl: './editor-start.component.html',
  styleUrls: ['./editor-start.component.css']
})
export class EditorStartComponent implements OnInit {

  constructor(private hotkeyService: HotkeyService) {
  }

  ngOnInit() {
    this.hotkeyService.addShortcut(['a']).subscribe(e => console.log(e));
  }

}
