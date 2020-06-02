import {Component, OnDestroy, OnInit} from '@angular/core';
import {EditorService} from '../../services/editor.service';
import {HotkeyService} from '../../../../core/service/hotkey/hotkey.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-editor-hotkeys',
  templateUrl: './editor-hotkeys.component.html',
  styleUrls: ['./editor-hotkeys.component.css']
})
export class EditorHotkeysComponent implements OnInit, OnDestroy {

  private saveSubscription: Subscription;

  constructor(private editorService: EditorService, private hotkeyService: HotkeyService) { }

  ngOnInit() {
    this.saveSubscription = this. hotkeyService.addShortcut(['s', 'Control']).subscribe(() => this.editorService.SavePackage());
  }

  ngOnDestroy(): void {
    this.saveSubscription.unsubscribe();
  }

}
