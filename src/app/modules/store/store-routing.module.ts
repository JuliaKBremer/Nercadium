import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreStartComponent } from './pages/store-start/store-start.component';

const routes: Routes = [
  {
    path: '',
    component: StoreStartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
