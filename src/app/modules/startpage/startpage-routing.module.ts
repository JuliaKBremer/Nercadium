import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartpageStartComponent } from './pages/startpage-start/startpage-start.component';

const routes: Routes = [
  {
    path: '',
    component: StartpageStartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartpageRoutingModule { }
