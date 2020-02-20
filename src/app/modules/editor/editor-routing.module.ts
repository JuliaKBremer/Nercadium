import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ChapterTabComponent} from "./pages/chapter-tab/chapter-tab.component";
import {CharacterTabComponent} from "./pages/character-tab/character-tab.component";
import {ObjectTabComponent} from "./pages/object-tab/object-tab.component";
import {EditorStartComponent} from "./pages/editor-start/editor-start.component";

const routes: Routes = [
  {
    path: '',
    component: EditorStartComponent
  },
  {
    path: 'chapter',
    component: ChapterTabComponent
  },
  {
    path: 'character',
    component: CharacterTabComponent
  },
  {
    path: 'object',
    component: ObjectTabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
