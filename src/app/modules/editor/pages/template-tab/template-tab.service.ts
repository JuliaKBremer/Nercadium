import {Injectable} from '@angular/core';
import {ITemplate} from '../../../../data/schema/Interfaces/Editor/ITemplate';
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
  private nextTemplateID = 0;
  private nextFieldID = 0;

  private selectedTemplate: BehaviorSubject<ITemplate>;


  constructor() {
    this.templates = new BehaviorSubject<ITemplate[]>([]);
    this.selectedTemplate = new BehaviorSubject<ITemplate>(null);
  }

  public GetTemplatesObservable() {
    return this.templates.asObservable();
  }

  public GetSelectedTemplateObservable() {
    return this.selectedTemplate.asObservable();
  }

  public SelectTemplate(templateToSelectID: number) {
    const templateToSelect = this.templates.value.find(obj => obj.ID === templateToSelectID);
    this.selectedTemplate.next(templateToSelect);
  }

  public AddTemplate() {
    const newTemplate: ITemplate = {
      ID: this.nextTemplateID++,
      Properties: {},
      Fields: []
    };

    newTemplate.Properties.Name = {id: 0, value: 'New Template', type: PropertyTypes.string};
    newTemplate.Properties.Type = {id: 1, value: PropertyTypes.boolean, type: PropertyTypes.enum, enum: PropertyTypes};

    this.templates.value.push(newTemplate);
  }

  public CopyTemplate(templateToCopyID: number) {
    const templateToCopy = this.templates.value.find(obj => obj.ID === templateToCopyID);
    const newTemplate: ITemplate = JSON.parse(JSON.stringify(templateToCopy));

    newTemplate.ID = this.nextTemplateID++;

    this.templates.value.push(newTemplate);
  }

  public DeleteTemplate(templateToDeleteID: number) {
    if (this.selectedTemplate.value && templateToDeleteID === this.selectedTemplate.value.ID) {
      this.selectedTemplate.next(null);
    }

    const currentTemplates: ITemplate[] = this.templates.value.filter(obj => obj.ID !== templateToDeleteID);
    this.templates.next(currentTemplates);
  }


  public AddField(templateID: number) {
    const newField: IField = {
      ID: this.nextFieldID++,
      IsCollapsed: false,
      Properties: {}
    };

    newField.Properties.Name = {id: 0, value: 'New Field', type: PropertyTypes.string};
    newField.Properties.Type = {id: 1, value: FieldTypes.textBox, type: PropertyTypes.enum, enum: FieldTypes};

    this.templates.value.find(template => template.ID === templateID).Fields.push(newField);
  }

  public CopyField({templateNumber: templateID, fieldNumber: fieldToCopyID}) {
    const templateFields = this.templates.value.find(obj => obj.ID === templateID);
    const fieldToCopy = templateFields.Fields.find(obj => obj.ID === fieldToCopyID);
    const newField: IField = JSON.parse(JSON.stringify(fieldToCopy));

    newField.ID = this.nextFieldID++;

    this.templates.value.find(template => template.ID === templateID).Fields.push(newField);
  }

  public DeleteField({templateNumber: templateID, fieldNumber: fieldToDeleteID}) {
    const currentTemplate: ITemplate = this.templates.value.find(obj => obj.ID === templateID);
    currentTemplate.Fields = currentTemplate.Fields.filter(obj => obj.ID !== fieldToDeleteID);
    this.selectedTemplate.next(currentTemplate);
  }
}
