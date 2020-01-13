import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartpageRoutingModule } from './startpage-routing.module';
import { StartpageStartComponent } from './pages/startpage-start/startpage-start.component';


@NgModule({
  declarations: [StartpageStartComponent],
  exports: [
    StartpageStartComponent
  ],
  imports: [
    CommonModule,
    StartpageRoutingModule
  ]
})
export class StartpageModule { }
