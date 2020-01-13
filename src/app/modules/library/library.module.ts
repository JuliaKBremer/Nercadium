import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryStartComponent } from './pages/library-start/library-start.component';


@NgModule({
  declarations: [LibraryStartComponent],
  exports: [
    LibraryStartComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
