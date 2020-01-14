import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './components/navbar.component';
import { MinMaxCloseComponent } from './components/min-max-close/min-max-close.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [NavbarComponent, MinMaxCloseComponent],
  exports: [
    NavbarComponent,
    MinMaxCloseComponent
  ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class NavbarModule { }
