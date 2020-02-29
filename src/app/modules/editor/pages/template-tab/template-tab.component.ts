import { Component, OnInit } from '@angular/core';
import {TemplateTabService} from "./template-tab.service";
import {IObject} from "../../../../data/schema/Interfaces/Editor/IObject";

@Component({
  selector: 'app-template-tab',
  templateUrl: './template-tab.component.html',
  styleUrls: ['./template-tab.component.css']
})
export class TemplateTabComponent implements OnInit {

  public selectedTemplate: IObject;

  constructor(public templateTabService: TemplateTabService) { }

  ngOnInit() {
  }
}
