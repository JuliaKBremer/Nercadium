import { ViewEncapsulation, Component, OnInit } from '@angular/core';
import { IArticle } from './iarticle';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
  encapsulation: ViewEncapsulation.None // Use to disable CSS Encapsulation for this component
})

export class TextEditorComponent implements OnInit {
  article: IArticle;
  Editor = ClassicEditor;
  editorConfig = {

  };
//   //  public onReady( editor ) {
// //  public onReady( editor ) {
// //    editor.ui.getEditableElement().parentElement.insertBefore(
//      editor.ui.view.toolbar.element,
//      editor.ui.getEditableElement()
//    );
//  }
  constructor() {
    this.article = {
      title: '',
      text: '',
    };
  }

  ngOnInit() {}

  onSubmit() {
    console.log('dosomething');
  }

}
