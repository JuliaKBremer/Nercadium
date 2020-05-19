import { Component, OnInit } from '@angular/core';
import {EditorService} from '../../services/editor.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-editor-start',
  templateUrl: './editor-start.component.html',
  styleUrls: ['./editor-start.component.css']
})
export class EditorStartComponent implements OnInit {

  packageName = '';

  constructor(private editorService: EditorService, private router: Router) { }

  ngOnInit() {
  }

  NewPackage() {
    if (this.packageName !== '') {
    this.editorService.NewPackage(this.packageName);
    this.router.navigate(['/editor/chapter']);
    }
  }

  LoadPackage() {
    this.editorService.LoadPackage();
    this.router.navigate(['/editor/chapter']);
  }

}
