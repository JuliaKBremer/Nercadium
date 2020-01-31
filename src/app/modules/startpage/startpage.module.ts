import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartpageRoutingModule } from './startpage-routing.module';
import { StartpageStartComponent } from './pages/startpage-start/startpage-start.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  keyboard: true,
  mousewheel: true,
  navigation: true,
  pagination: false,
  autoplay: true
};

@NgModule({
  declarations: [StartpageStartComponent],
  exports: [
    StartpageStartComponent
  ],
  imports: [
    CommonModule,
    StartpageRoutingModule,
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class StartpageModule { }
