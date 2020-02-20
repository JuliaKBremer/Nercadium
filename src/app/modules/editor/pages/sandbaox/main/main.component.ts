import {Component, Input, OnInit} from '@angular/core';
import {ITemplate} from "../template.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @Input() selectedTemplate: ITemplate;

  constructor() { }

  ngOnInit() {
  }

}
