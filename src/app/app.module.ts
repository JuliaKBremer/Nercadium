import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {NavbarModule} from './modules/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule} from 'angular-webstorage-service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {CKEditor5} from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        StorageServiceModule,
        AppRoutingModule,
        CoreModule,
        HttpClientModule,
        NavbarModule,
        NoopAnimationsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
