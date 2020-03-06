import {Injectable} from '@angular/core';
import {ITemplate} from '../../../../data/schema/Interfaces/Editor/ITemplate';
import {PropertyTypes} from '../../../../data/schema/Enums/property-types.enum';
import {IField} from '../../../../data/schema/Interfaces/Editor/IField';
import {FieldTypes} from '../../../../data/schema/Enums/field-types.enum';
import {BehaviorSubject} from 'rxjs';
import {IObject} from '../../../../data/schema/Interfaces/Editor/IObject';

@Injectable({
  providedIn: 'root'
})
export class TemplateTabService {


  constructor() {
    this.objects = new BehaviorSubject<IObject[]>([]);
    this.selectedObject = new BehaviorSubject<IObject>(null);
  }

  // Dummy
  private objects: BehaviorSubject<IObject[]>;
  private nextObjectID = 0;
  private nextFieldID = 0;

  private selectedObject: BehaviorSubject<IObject>;

  private static AddTemplate(): ITemplate {
    const newTemplate: ITemplate = {
      Properties: {},
      Fields: []
    };

    newTemplate.Properties.Name = {id: 0, value: 'New Template', type: PropertyTypes.string};
    newTemplate.Properties.Type = {id: 1, value: PropertyTypes.boolean, type: PropertyTypes.enum, enum: PropertyTypes};

    return newTemplate;
  }

  public GetObjectsObservable() {
    return this.objects.asObservable();
  }

  public GetSelectedObjectObservable() {
    return this.selectedObject.asObservable();
  }

  public SelectObject(objectToSelectID: number) {
    const objectToSelect = this.objects.value.find(obj => obj.ID === objectToSelectID);
    this.selectedObject.next(objectToSelect);
  }

  public AddObject() {
    const newObject: IObject = {
      Discriminator: 'I-AM-Template',
      ID: this.nextObjectID++,
      Properties: {},
      FieldValues: {}
    };

    newObject.Properties.Name = {id: 0, value: 'New Object', type: PropertyTypes.string};
    newObject.Properties.Type = {id: 1, value: PropertyTypes.boolean, type: PropertyTypes.enum, enum: PropertyTypes};

    newObject.Template = TemplateTabService.AddTemplate();

    this.objects.value.push(newObject);
  }

  public CopyObject(objectToCopyID: number) {
    const templateToCopy: IObject = this.objects.value.find(obj => obj.ID === objectToCopyID);
    const newObject: IObject = JSON.parse(JSON.stringify(templateToCopy));

    newObject.ID = this.nextObjectID++;

    this.objects.value.push(newObject);
  }

  public DeleteObject(objectToDeleteID: number) {
    if (this.selectedObject.value && objectToDeleteID === this.selectedObject.value.ID) {
      this.selectedObject.next(null);
    }

    const currentObject: IObject[] = this.objects.value.filter(obj => obj.ID !== objectToDeleteID);
    this.objects.next(currentObject);
  }


  public AddField(objectID: number) {
    const newField: IField = {
      Discriminator: 'I-AM-Field',
      ID: this.nextFieldID++,
      IsCollapsed: false,
      Properties: {}
    };

    newField.Properties.Name = {id: 0, value: 'New Field', type: PropertyTypes.string};
    newField.Properties.Type = {id: 1, value: FieldTypes.textBox, type: PropertyTypes.enum, enum: FieldTypes};

    const currentObject = this.objects.value.find(obj => obj.ID === objectID);
    currentObject.FieldValues[newField.ID] = 'TexBox';
    currentObject.Template.Fields.push(newField);
  }

  public CopyField({objectID: objectID, fieldID: fieldToCopyID}) {
    const currentObject = this.objects.value.find(obj => obj.ID === objectID);
    const template: ITemplate = currentObject.Template;
    const fieldToCopy: IField = template.Fields.find(obj => obj.ID === fieldToCopyID);
    const newField: IField = JSON.parse(JSON.stringify(fieldToCopy));

    newField.ID = this.nextFieldID++;

    currentObject.FieldValues[newField.ID] = currentObject.FieldValues[fieldToCopy.ID];

    this.objects.value.find(obj => obj.ID === objectID).Template.Fields.push(newField);
  }

  public DeleteField({objectID: objectID, fieldID: fieldToDeleteID}) {
    const currentObject: IObject = this.objects.value.find(obj => obj.ID === objectID);
    currentObject.Template.Fields = currentObject.Template.Fields.filter(obj => obj.ID !== fieldToDeleteID);
    delete currentObject.FieldValues[fieldToDeleteID];
    this.selectedObject.next(currentObject);
  }
}
