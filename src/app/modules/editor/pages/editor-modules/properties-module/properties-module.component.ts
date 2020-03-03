import {Component, Input, OnInit} from '@angular/core';
import {IObject} from '../../../../../data/schema/Interfaces/Editor/IObject';
import {IProperties} from '../../../../../data/schema/Interfaces/Editor/IProperty';
import {IField} from '../../../../../data/schema/Interfaces/Editor/IField';

@Component({
  selector: 'app-properties-module',
  templateUrl: './properties-module.component.html',
  styleUrls: ['./properties-module.component.css']
})
export class PropertiesModuleComponent implements OnInit {

  @Input() set selectedObject(object: IObject) {
    this.object = object;
    if (this.object) {
      this.checkProps(this.object);
    }
  }

  constructor() { }

  public object: IObject;
  public properties: IProperties;
  public fields: IField;

  private checkProps(object) {
    if (typeof(object.Properties) !== 'undefined') {
      this.properties = object.Properties;
    } else {
      this.properties = null;
    }

    if (typeof(object.Fields) !== 'undefined') {
      this.fields = object.Fields;
    } else {
      this.fields = null;
    }
  }

  ngOnInit() {
  }
}
