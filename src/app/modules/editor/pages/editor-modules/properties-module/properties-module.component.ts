import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {IProperties} from '../../../../../data/schema/Interfaces/Editor/IProperty';
import {IField} from '../../../../../data/schema/Interfaces/Editor/IField';
import {Observable, Subscription} from 'rxjs';
import {GameObjectTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {GameCharacterTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {FieldTypes} from '../../../../../data/schema/Enums/field-types.enum';
import {EntityTypeEnum} from '../../../../../data/schema/Classes/Storage/EntityTypeEnum';
import {GameObject} from '../../../../../data/schema/Classes/Editor/Objects/GameObject';

@Component({
  selector: 'app-properties-module',
  templateUrl: './properties-module.component.html',
  styleUrls: ['./properties-module.component.css']
})
export class PropertiesModuleComponent implements OnInit, OnDestroy {

  @Input() selectedObjectObservable: Observable<any>;
  @Input() templatesObservable: Observable<GameObjectTemplate[] | GameCharacterTemplate[]>;

  // Template
  @Output() addField = new EventEmitter<number>();
  @Output() deleteField = new EventEmitter<{fieldID: number, objectID: number}>();
  @Output() copyField = new EventEmitter<{fieldID: number, objectID: number}>();
  @Output() changeFieldType = new EventEmitter<{templateID: number, fieldID: number, fieldType: FieldTypes}>();

  // Object
  @Output() changeTemplate = new EventEmitter<number>();

  public properties: IProperties;
  public fields: IField[];
  public selectedObject: any;

  public templates: GameCharacterTemplate[] | GameObjectTemplate[];

  private selectedObjectSubscription: Subscription;
  private templatesSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (this.templatesObservable !== undefined) {
      this.templatesSubscription = this.templatesObservable.subscribe(next => {
        this.templates = next;
      });
    }

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

    if (this.templatesSubscription) {
      this.templatesSubscription.unsubscribe();
    }
  }

  private checkSelectedObject(object: any) {
    if (object && typeof(object.EntityType) !== 'undefined') {
      if (object.EntityType === EntityTypeEnum.ObjectTemplate || object.EntityType === EntityTypeEnum.CharacterTemplate) {
        this.checkTemplateProps(object);
      } else if (object.EntityType === EntityTypeEnum.Object) {
        this.checkObjectProps(object);
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

  private checkObjectProps(object: GameObject) {
    if (typeof(object.Properties) !== 'undefined') {
      object.Properties.Template.enum = this.TemplatesToEnum();
      this.properties = object.Properties;
    } else {
      this.properties = null;
    }

    this.fields = null;
  }

  private TemplatesToEnum() {
    const templateEnum = {};
    this.templates.forEach((template, index) => {
      if (typeof(templateEnum[template.Properties.Name.value]) === 'undefined') {
        templateEnum[template.Properties.Name.value] = template.id;
      } else {
        templateEnum[template.Properties.Name.value + '_' + index] = template.id;
      }
    });
    return templateEnum;
  }
}
