import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IProperties} from '../../../../../data/schema/Interfaces/Editor/IProperty';
import {IField} from '../../../../../data/schema/Interfaces/Editor/IField';
import {Observable, Subscription} from 'rxjs';
import {IObject} from '../../../../../data/schema/Interfaces/Editor/IObject';
import {ITemplate} from 'src/app/data/schema/Interfaces/Editor/ITemplate';

@Component({
  selector: 'app-properties-module',
  templateUrl: './properties-module.component.html',
  styleUrls: ['./properties-module.component.css']
})
export class PropertiesModuleComponent implements OnInit, OnDestroy {

  @Input() selectedObjectObservable: Observable<IObject>;

  @Output() addField = new EventEmitter<number>();
  @Output() deleteField = new EventEmitter<{fieldID: number, objectID: number}>();
  @Output() copyField = new EventEmitter<{fieldID: number, objectID: number}>();

  public properties: IProperties;
  public fields: IField[];
  public selectedObject: IObject;

  private selectedObjectSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (this.selectedObjectObservable !== undefined) {
      this.selectedObjectSubscription = this.selectedObjectObservable.subscribe(next => {
        this.selectedObject = next;
        this.checkSelectedObject(this.selectedObject);
      });
    }
  }

  ngOnDestroy() {
    if (this.selectedObjectSubscription) {
      this.selectedObjectSubscription.unsubscribe();
    }
  }

  private checkSelectedObject(object: IObject) {
    if (object) {
      if (object.Discriminator === 'I-AM-Template') {
        this.checkTemplateProps(object.Template);
      }
    } else {
      this.properties = null;
      this.fields = null;
    }
  }

  private checkTemplateProps(template: ITemplate) {
    if (typeof(template.Properties) !== 'undefined') {
      this.properties = template.Properties;
    } else {
      this.properties = null;
    }

    if (typeof(template.Fields) !== 'undefined') {
      this.fields = template.Fields;
    } else {
      this.fields = null;
    }
  }
}
