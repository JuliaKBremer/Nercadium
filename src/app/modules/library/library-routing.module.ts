import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibraryStartComponent } from './pages/library-start/library-start.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryStartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
