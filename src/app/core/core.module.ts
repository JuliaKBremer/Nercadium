import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotkeyComponent } from './components/hotkey/hotkey.component';



@NgModule({
  declarations: [HotkeyComponent],
  exports: [
    HotkeyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
