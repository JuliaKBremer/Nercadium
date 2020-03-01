import {Component, Input, OnInit} from '@angular/core';
import {IObject} from "../../../../../data/schema/Interfaces/Editor/IObject";

@Component({
  selector: 'app-properties-module',
  templateUrl: './properties-module.component.html',
  styleUrls: ['./properties-module.component.css']
})
export class PropertiesModuleComponent implements OnInit {

  @Input() selectedObject: IObject;

  constructor() { }

  ngOnInit() {
  }
}
