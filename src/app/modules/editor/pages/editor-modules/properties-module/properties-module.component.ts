import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IProperties} from '../../../../../data/schema/Interfaces/Editor/IProperty';
import {IField} from '../../../../../data/schema/Interfaces/Editor/IField';
import {Observable, Subscription} from 'rxjs';
import {GameObjectTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {GameCharacterTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {FieldTypes} from '../../../../../data/schema/Enums/field-types.enum';

@Component({
  selector: 'app-properties-module',
  templateUrl: './properties-module.component.html',
  styleUrls: ['./properties-module.component.css']
})
export class PropertiesModuleComponent implements OnInit, OnDestroy {

  @Input() selectedObjectObservable: Observable<any>;

  @Output() addField = new EventEmitter<number>();
  @Output() deleteField = new EventEmitter<{fieldID: number, objectID: number}>();
  @Output() copyField = new EventEmitter<{fieldID: number, objectID: number}>();
  @Output() changeFieldType = new EventEmitter<{templateID: number, fieldID: number, fieldType: FieldTypes}>();

  public properties: IProperties;
  public fields: IField[];
  public selectedObject: any;

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

  private checkSelectedObject(object: any) {
    if (object) {
      if (object instanceof GameObjectTemplate || object instanceof GameCharacterTemplate) {
        this.checkTemplateProps(object);
      }
    } else {
      this.properties = null;
      this.fields = null;
    }
  }

  private checkTemplateProps(template: GameObjectTemplate|GameCharacterTemplate) {
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
