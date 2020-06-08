import {ViewEncapsulation, Component, Input} from '@angular/core';
import {IBaseGameEntity} from '../../../../data/schema/Interfaces/Editor/IBaseGameEntity';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Base64UploadAdapter from './Base64Upload';


@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css'],
  encapsulation: ViewEncapsulation.None // Use to disable CSS Encapsulation for this component
})

export class TextEditorComponent {

  @Input() selectedObject: IBaseGameEntity;

  public Editor = ClassicEditor;
  public editorConfig = { extraPlugins: [Base64UploadAdapter] };

  constructor() {
  }
}
