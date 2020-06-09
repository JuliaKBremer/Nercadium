import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {EditorStartComponent} from './pages/editor-start/editor-start.component';
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
