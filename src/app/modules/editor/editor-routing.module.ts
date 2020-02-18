import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ChapterTabComponent} from "./pages/chapter-tab/chapter-tab.component";
import {CharacterTabComponent} from "./pages/character-tab/character-tab.component";
import {ObjectTabComponent} from "./pages/object-tab/object-tab.component";
import {TemplateTabComponent} from "./pages/sandbaox/template-tab/template-tab.component";

const routes: Routes = [
  {
    path: '',
    component: TemplateTabComponent
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
