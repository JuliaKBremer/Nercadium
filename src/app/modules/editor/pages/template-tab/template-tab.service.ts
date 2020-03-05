import {Injectable} from '@angular/core';
import {ITemplate} from '../../../../data/schema/Interfaces/Editor/ITemplate';
import {IObject} from '../../../../data/schema/Interfaces/Editor/IObject';
import {PropertyTypes} from '../../../../data/schema/Enums/property-types.enum';
import {IField} from '../../../../data/schema/Interfaces/Editor/IField';
import {FieldTypes} from '../../../../data/schema/Enums/field-types.enum';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemplateTabService {

  // Dummy
  private templates: BehaviorSubject<ITemplate[]>;

  private selectedObject: BehaviorSubject<ITemplate>;

  constructor() {
    this.templates = new BehaviorSubject<ITemplate[]>([]);
    this.selectedObject = new BehaviorSubject<ITemplate>(null);
  }

  public GetTemplatesObservable() {
    return this.templates.asObservable();
  }

  public GetSelectedTemplateObservable() {
    return this.selectedObject.asObservable();
  }

  public SelectTemplate(objectToSelect: ITemplate) {
    this.selectedObject.next(objectToSelect);
  }

  public AddTemplate() {
    const newTemplate: ITemplate = {
      Order: this.templates.value.length,
      Properties: {},
      Fields: []
    };

    newTemplate.Properties.Name = {id: 0, value: 'New Template', type: PropertyTypes.string};
    newTemplate.Properties.Type = {id: 0, value: PropertyTypes.boolean, type: PropertyTypes.enum, enum: PropertyTypes};

    this.templates.value.push(newTemplate);
  }

  public CopyTemplate(objectToCopy: IObject) {
    this.templates.value.push(JSON.parse(JSON.stringify(objectToCopy)));
  }

  public DeleteTemplate(objectToDelete: IObject) {
    if (objectToDelete === this.selectedObject.value) {
      this.selectedObject.next(null);
    }

    const currentTemplates: ITemplate[] = this.templates.value.filter(obj => obj !== objectToDelete);
    this.templates.next(currentTemplates);
  }


  public AddField(fields: IField[]) {
    const newField: IField = {
      ID: fields.length,
      IsCollapsed: false,
      Properties: {}
    };

    newField.Properties.Name = {id: 0, value: 'New Field', type: PropertyTypes.string};
    newField.Properties.Type = {id: 1, value: FieldTypes.textBox, type: PropertyTypes.enum, enum: FieldTypes};

    fields.push(newField);
  }

  public DeleteField(fieldToDelete: IField) {
    const currentTemplate: ITemplate = this.selectedObject.value;
    currentTemplate.Fields = currentTemplate.Fields.filter(obj => obj !== fieldToDelete);
    this.selectedObject.next(currentTemplate);
  }

  public CopyField(fieldToCopy: IField) {
    this.selectedObject.value.Fields.push(JSON.parse(JSON.stringify(fieldToCopy)));
  }
}
