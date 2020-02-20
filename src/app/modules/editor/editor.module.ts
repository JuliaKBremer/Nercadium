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
import { TemplateTabComponent } from './pages/sandbaox/template-tab/template-tab.component';
import { SammlungComponent } from './pages/sandbaox/sammlung/sammlung.component';
import { MainComponent } from './pages/sandbaox/main/main.component';
import { PropertiesComponent } from './pages/sandbaox/properties/properties.component';


@NgModule({
  declarations: [EditorStartComponent, PropertiesModuleComponent, MainContentModuleComponent, ContentOrganizerModuleComponent, EditorNavbarComponent, ChapterTabComponent, CharacterTabComponent, ObjectTabComponent, TemplateTabComponent, SammlungComponent, MainComponent, PropertiesComponent],
  exports: [
    EditorStartComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    FormsModule
  ]
})
export class EditorModule { }
