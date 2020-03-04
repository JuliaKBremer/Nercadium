import {Injectable, InjectFlags} from '@angular/core';
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
  private templates: ITemplate[] = [];

  private selectedTemplate: BehaviorSubject<ITemplate>;

  constructor() { }

  public GetTemplates() {
    return this.templates;
  }

  public GetSelectedTemplate() {
    return this.selectedTemplate;
  }

  public AddTemplate() {
    const newTemplate: ITemplate = {
      Order: this.templates.length,
      Properties: {},
      Fields: []
    };

    newTemplate.Properties.Name = {id: 0, value: 'New Template', type: PropertyTypes.string};
    newTemplate.Properties.Type = {id: 0, value: PropertyTypes.boolean, type: PropertyTypes.enum, enum: PropertyTypes};

    this.templates.push(newTemplate);
  }

  public CopyTemplate(objectToCopy: IObject) {
    this.templates.push(JSON.parse(JSON.stringify(objectToCopy)));
  }

  public DeleteTemplate(objectToDelete: IObject) {
    if (objectToDelete === this.selectedTemplate) {
      this.selectedTemplate = null;
    }

    this.templates = this.templates.filter(obj => obj !== objectToDelete);
  }

  public SelectTemplate(objectToSelect: ITemplate) {
    this.selectedTemplate.next(objectToSelect);
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

  public DeleteField({fieldsToEdit: fields, fieldToDelete: field}) {
    const currentTemplate: ITemplate = this.selectedTemplate.value;
    currentTemplate.Fields = currentTemplate.Fields.filter(obj => obj !== field);
    this.selectedTemplate.next(currentTemplate);
  }

  public CopyField({fieldsToEdit: fields, fieldToDelete: field}) {
    fields.push(JSON.parse(JSON.stringify(field)));
  }
}
