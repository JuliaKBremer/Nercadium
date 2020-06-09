import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorStartComponent } from './pages/editor-start/editor-start.component';
import { MainContentModuleComponent } from './pages/editor-modules/main-content-module/main-content-module.component';
import {FormsModule} from '@angular/forms';
import { TextEditorComponent } from './shared/text-editor/text-editor.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { PropertiesListComponent } from './pages/editor-modules/properties-module/properties-list/properties-list.component';
import { FieldsListComponent } from './pages/editor-modules/properties-module/fields-list/fields-list.component';
import { FieldsDisplayComponent } from './pages/editor-modules/main-content-module/fields-display/fields-display.component';
import {NgForNumberPipe} from '../../shared/pipes/ng-for-number.pipe';
import { EditorHotkeysComponent } from './shared/editor-hotkeys/editor-hotkeys.component';
import {EditorComponent} from './pages/editor/editor.component';

@NgModule({
  declarations: [
    EditorStartComponent,
    MainContentModuleComponent,
    TextEditorComponent,
    PropertiesListComponent,
    FieldsListComponent,
    FieldsDisplayComponent,
    NgForNumberPipe,
    EditorHotkeysComponent,
    EditorComponent
  ],
  exports: [
    EditorStartComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    FormsModule,
    CKEditorModule
  ]
})
export class EditorModule { }
