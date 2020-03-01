import { Component, OnInit } from '@angular/core';
import {TemplateTabService} from "./template-tab.service";

@Component({
  selector: 'app-template-tab',
  templateUrl: './template-tab.component.html',
  styleUrls: ['./template-tab.component.css']
})
export class TemplateTabComponent implements OnInit {

  constructor(public templateTabService: TemplateTabService) { }

  ngOnInit() {
  }
}
