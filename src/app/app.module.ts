import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {NavbarModule} from './modules/navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { StorageServiceModule} from 'angular-webstorage-service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './data/db/in-memory-data.service';
import {DataSearchService} from './data/db/data-search.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StorageServiceModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    NavbarModule,
    NoopAnimationsModule,
    Ng2SearchPipeModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [
    DataSearchService
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
