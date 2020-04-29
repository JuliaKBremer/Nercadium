import { Component, OnInit } from '@angular/core';
import {EditorService} from '../../../services/editor.service';

@Component({
  selector: 'app-editor-navbar',
  templateUrl: './editor-navbar.component.html',
  styleUrls: ['./editor-navbar.component.css']
})
export class EditorNavbarComponent implements OnInit {

  constructor(public editorService: EditorService) { }

  ngOnInit() {
  }

}
