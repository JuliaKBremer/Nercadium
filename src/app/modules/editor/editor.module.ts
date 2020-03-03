import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorStartComponent } from './pages/editor-start/editor-start.component';
import { PropertiesModuleComponent } from './pages/editor-modules/properties-module/properties-module.component';
import { MainContentModuleComponent } from './pages/editor-modules/main-content-module/main-content-module.component';
import { ContentOrganizerModuleComponent } from './pages/editor-modules/content-organizer-module/content-organizer-module.component';
import {FormsModule} from '@angular/forms';
import { EditorNavbarComponent } from './pages/editor-modules/editor-navbar/editor-navbar.component';
import { ChapterTabComponent } from './pages/chapter-tab/chapter-tab.component';
import { CharacterTabComponent } from './pages/character-tab/character-tab.component';
import { ObjectTabComponent } from './pages/object-tab/object-tab.component';
import { TextEditorComponent } from './shared/text-editor/text-editor.component';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import { TemplateTabComponent } from './pages/template-tab/template-tab.component';
import { PropertiesListComponent } from './pages/editor-modules/properties-module/properties-list/properties-list.component';
import { FieldsListComponent } from './pages/editor-modules/properties-module/fields-list/fields-list.component';

@NgModule({
  declarations: [
    EditorStartComponent,
    PropertiesModuleComponent,
    MainContentModuleComponent,
    ContentOrganizerModuleComponent,
    EditorNavbarComponent,
    ChapterTabComponent,
    CharacterTabComponent,
    ObjectTabComponent,
    TextEditorComponent,
    TemplateTabComponent,
    PropertiesListComponent,
    FieldsListComponent
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
