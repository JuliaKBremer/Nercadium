import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryStartComponent } from './pages/library-start/library-start.component';
import {MatGridListModule} from '@angular/material';
import {MatCardModule} from '@angular/material/typings/esm5/card';


@NgModule({
  declarations: [LibraryStartComponent],
  exports: [
    LibraryStartComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    MatGridListModule,
    MatCardModule
  ]
})
export class LibraryModule { }
