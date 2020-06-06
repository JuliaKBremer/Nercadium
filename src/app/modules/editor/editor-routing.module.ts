import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ChapterTabComponent} from './pages/chapter-tab/chapter-tab.component';
import {CharacterTabComponent} from './pages/character-tab/character-tab.component';
import {ObjectTabComponent} from './pages/object-tab/object-tab.component';
import {EditorStartComponent} from './pages/editor-start/editor-start.component';
import {TemplateTabComponent} from './pages/template-tab/template-tab.component';
import {EditorComponent} from './pages/editor/editor.component';

const routes: Routes = [
  {
    path: '',
    component: EditorStartComponent
  },
  {
    path: 'editor',
    component: EditorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
