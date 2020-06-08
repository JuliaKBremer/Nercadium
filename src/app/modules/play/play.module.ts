import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayRoutingModule } from './play-routing.module';
import { PlayStartComponent } from './pages/play-start/play-start.component';


@NgModule({
  declarations: [PlayStartComponent],
  exports: [
    PlayStartComponent
  ],
  imports: [
    CommonModule,
    PlayRoutingModule,
  ]
})
export class PlayModule { }
