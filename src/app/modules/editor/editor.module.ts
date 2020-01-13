import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorStartComponent } from './pages/editor-start/editor-start.component';


@NgModule({
  declarations: [EditorStartComponent],
  exports: [
    EditorStartComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
