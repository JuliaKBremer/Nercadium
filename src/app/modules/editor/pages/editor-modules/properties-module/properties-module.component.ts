import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IObject} from '../../../../../data/schema/Interfaces/Editor/IObject';
import {IProperties} from '../../../../../data/schema/Interfaces/Editor/IProperty';
import {IField} from '../../../../../data/schema/Interfaces/Editor/IField';
import {TemplateTabService} from '../../template-tab/template-tab.service';

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

  @Output() addField = new EventEmitter<IField[]>();
  @Output() deleteField: EventEmitter<{fieldsToEdit: IField[], fieldToDelete: IField}> = new EventEmitter();
  @Output() copyField: EventEmitter<{fieldsToEdit: IField[], fieldToDelete: IField}> = new EventEmitter();

  constructor(private templateTabService: TemplateTabService) { }

  public object: IObject;
  public properties: IProperties;
  public fields: IField[];

  private checkProps(object) {
    if (typeof(object.Properties) !== 'undefined') {
      this.properties = object.Properties;
    } else {
      this.properties = null;
    }

    if (typeof(object.Fields) !== 'undefined') {
      this.templateTabService.GetSelectedTemplateObservable().subscribe(next => {
        this.fields = next.Fields;
      });
      // this.fields = this.templateTabService.GetSelectedTemplate().Fields;
    } else {
      this.fields = null;
    }
  }

  ngOnInit() {
  }
}
