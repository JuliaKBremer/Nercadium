import {AfterContentInit, Component, OnInit} from '@angular/core';
import { SwiperComponent, SwiperConfigInterface  } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-startpage-start',
  templateUrl: './startpage-start.component.html',
  styleUrls: ['./startpage-start.component.css']
})
export class StartpageStartComponent implements OnInit {
  config: any;
  index: any;

  constructor() {
  }

  ngOnInit() {
  }

}
