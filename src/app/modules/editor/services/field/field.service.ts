import { Injectable } from '@angular/core';
import {IField} from '../../../../data/schema/Interfaces/Editor/IField';
import {PropertyTypes} from '../../../../data/schema/Enums/property-types.enum';
import {FieldTypes} from '../../../../data/schema/Enums/field-types.enum';
import {TableStyles} from '../../../../data/schema/Enums/table-styles.enum';
import {EditorService} from '../editor/editor.service';
import {EventService} from '../../../../core/service/event/event.service';
import {IProperty} from '../../../../data/schema/Interfaces/Editor/IProperty';
import {IBaseGameEntity} from '../../../../data/schema/Interfaces/Editor/IBaseGameEntity';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor(private editorService: EditorService, private eventService: EventService) {
    // Init events
    eventService.on('Change-Field-Type', (property: IProperty) => {
      const object: IBaseGameEntity = editorService.FindObjectByID(property.parentObjectID);
      const field: IField = this.FindFieldByIDinObject(property.parentFieldID, object);
      this.ChangeFieldType(object, field, property.value);
    });
  }

  public AddField(selectedObject: IBaseGameEntity) {
    const newField: IField = {
      ID: this.editorService.GetNewID(),
      IsCollapsed: false,
      Properties: {},
      ParentID: selectedObject.id
    };

    newField.Properties.Name = {id: 0, value: 'New Field', type: PropertyTypes.string};
    newField.Properties.Type = {id: 1, value: FieldTypes.TextBox, type: PropertyTypes.enum, enum: FieldTypes,
      changeFireEvent: 'Change-Field-Type'};
    newField.Properties.Top = {id: 2, description: 'in px', value: 0, type: PropertyTypes.number};
    newField.Properties.Left = {id: 3, description: 'in px', value: 0, type: PropertyTypes.number};

    selectedObject.Fields.push(newField);

    this.ChangeFieldType(selectedObject, newField, FieldTypes.TextBox);
  }

  public CopyFieldInSelectedObject(fieldToCopy: IField) {
    const currentObject: IBaseGameEntity = this.editorService.FindObjectByID(fieldToCopy.ParentID);
    const newField: IField = JSON.parse(JSON.stringify(fieldToCopy));

    newField.ID = this.editorService.GetNewID();

    this.UpdatePropertyFieldParentID(newField);

    currentObject.FieldValues[newField.ID] = currentObject.FieldValues[fieldToCopy.ID];

    currentObject.Fields.push(newField);
  }

  public DeleteField(fieldToDelete: IField) {
    const currentObject: IBaseGameEntity = this.editorService.FindObjectByID(fieldToDelete.ParentID);

    const fieldIndex: number = currentObject.Fields.findIndex((element) => element === fieldToDelete);
    currentObject.Fields.splice(fieldIndex, 1);

    delete currentObject.FieldValues[fieldToDelete.ID];
  }

  public FindFieldByIDinObject(fieldID: number, object: IBaseGameEntity): IField {
    return object.Fields.find(field => field.ID === fieldID);
  }

  private UpdatePropertyFieldParentID(field: IField) {
    for (const key in field.Properties) {
      if (field.Properties[key]) {
        field.Properties[key].parentFieldID = field.ID;
        field.Properties[key].parentObjectID = field.ParentID;
      }
    }
  }

  public ChangeFieldType(selectedObject: IBaseGameEntity, field: IField, newFieldType: FieldTypes) {
    for (const key in field.Properties) {
      if (key !== 'Name' && key !== 'Type' && key !== 'Top' && key !== 'Left') {
        delete field.Properties[key];
      }
    }

    switch (newFieldType) {
      case FieldTypes.TextBox: {
        field.Properties.Label = {id: 4, value: 'TextBox', type: PropertyTypes.string};
        field.Properties.MaxLength = {id: 5, value: 20, type: PropertyTypes.number};
        field.Properties.Placeholder = {id: 6, value: 'Text Box', type: PropertyTypes.string};
        field.Properties.ReadOnly = {id: 7, value: false, type: PropertyTypes.boolean};
        field.Properties.Size = {id: 8, value: 20, type: PropertyTypes.number};

        selectedObject.FieldValues[field.ID] = '';
        break;
      }
      case FieldTypes.TextArea: {
        field.Properties.Label = {id: 4, value: 'TextArea', type: PropertyTypes.string};
        field.Properties.Cols = {id: 5, value: 20, type: PropertyTypes.number};
        field.Properties.Rows = {id: 6, value: 20, type: PropertyTypes.number};
        field.Properties.MaxLength = {id: 7, value: 20, type: PropertyTypes.number};
        field.Properties.Placeholder = {id: 8, value: 'Text Area', type: PropertyTypes.string};
        field.Properties.ReadOnly = {id: 9, value: false, type: PropertyTypes.boolean};
        field.Properties.Resize = {id: 10, value: false, type: PropertyTypes.boolean};

        selectedObject.FieldValues[field.ID] = '';
        break;
      }
      case FieldTypes.Number: {
        field.Properties.Label = {id: 4, value: 'Number', type: PropertyTypes.string};
        field.Properties.Min = {id: 5, value: '0', type: PropertyTypes.number};
        field.Properties.Max = {id: 6, value: '999', type: PropertyTypes.number};
        field.Properties.Step = {id: 7, value: '1', type: PropertyTypes.number};
        field.Properties.ReadOnly = {id: 8, value: false, type: PropertyTypes.boolean};

        selectedObject.FieldValues[field.ID] = 0;
        break;
      }
      case FieldTypes.Select: {
        field.Properties.Label = {id: 4, value: 'Select', type: PropertyTypes.string};
        field.Properties.Options = {id: 5, value: ['Option'], type: PropertyTypes.options};

        selectedObject.FieldValues[field.ID] = 'Option';
        break;
      }
      case FieldTypes.CheckBox: {
        field.Properties.Label = {id: 4, value: 'CheckBox', type: PropertyTypes.string};

        selectedObject.FieldValues[field.ID] = false;
        break;
      }
      case FieldTypes.Radio: {
        field.Properties.Label = {id: 4, value: 'Radio', type: PropertyTypes.string};

        selectedObject.FieldValues[field.ID] = false;
        break;
      }
      case FieldTypes.Range: {
        field.Properties.Label = {id: 4, value: 'Range', type: PropertyTypes.string};
        field.Properties.Min = {id: 5, value: '0', type: PropertyTypes.number};
        field.Properties.Max = {id: 6, value: '999', type: PropertyTypes.number};
        field.Properties.Step = {id: 7, value: '1', type: PropertyTypes.number};
        field.Properties.ReadOnly = {id: 8, value: false, type: PropertyTypes.boolean};

        selectedObject.FieldValues[field.ID] = 0;
        break;
      }
      case FieldTypes.Table: {
        field.Properties.Label = {id: 4, value: 'Table', type: PropertyTypes.string};
        field.Properties.Rows = {id: 5, value: 10, type: PropertyTypes.number};
        field.Properties.Cols = {id: 6, value: 10, type: PropertyTypes.number};
        field.Properties.Width = {id: 6, description: 'in % oder px', value: '100%', type: PropertyTypes.string};
        field.Properties.TableStyle = {id: 7, value: TableStyles.StyleOne,
          type: PropertyTypes.enum, enum: TableStyles};

        selectedObject.FieldValues[field.ID] = [];
        break;
      }
      case FieldTypes.Image: {
        field.Properties.Label = {id: 4, value: 'Table', type: PropertyTypes.string};
        field.Properties.Width = {id: 5, description: 'in % oder px', value: '100%', type: PropertyTypes.string};
        field.Properties.Height = {id: 6, description: 'in px', value: '', type: PropertyTypes.string};

        selectedObject.FieldValues[field.ID] = '';
        break;
      }
    }

    this.UpdatePropertyFieldParentID(field);
  }
}
