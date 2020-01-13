import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreStartComponent } from './pages/store-start/store-start.component';


@NgModule({
  declarations: [StoreStartComponent],
  exports: [
    StoreStartComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule
  ]
})
export class StoreModule { }
