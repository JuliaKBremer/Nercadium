import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorStartComponent } from './pages/editor-start/editor-start.component';

const routes: Routes = [
  {
    path: '',
    component: EditorStartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
