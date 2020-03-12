import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayStartComponent } from './pages/play-start/play-start.component';

const routes: Routes = [
  {
    path: '',
    component: PlayStartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }
