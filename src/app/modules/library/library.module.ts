import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryStartComponent } from './pages/library-start/library-start.component';
import {MatButton, MatButtonModule, MatFormFieldModule, MatGridListModule} from '@angular/material';
import {MatCardModule} from '@angular/material/typings/esm5/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {Ng2SearchPipeModule} from 'ng2-search-filter';


@NgModule({
  declarations: [LibraryStartComponent],
  exports: [
    LibraryStartComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    MatGridListModule,
    MatCardModule,
    ScrollingModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    FormsModule,
    Ng2SearchPipeModule
  ]
})
export class LibraryModule { }
