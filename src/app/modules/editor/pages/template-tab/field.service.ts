import { Injectable } from '@angular/core';
import {TemplateTabService} from './template-tab.service';
import {IField} from '../../../../data/schema/Interfaces/Editor/IField';
import {GameCharacterTemplate} from '../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {GameObjectTemplate} from '../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {PropertyTypes} from '../../../../data/schema/Enums/property-types.enum';
import {FieldTypes} from '../../../../data/schema/Enums/field-types.enum';
import {TableStyles} from '../../../../data/schema/Enums/table-styles.enum';
import {EditorService} from '../../services/editor.service';
import {EventService} from '../../../../core/service/event/event.service';
import {IProperty} from '../../../../data/schema/Interfaces/Editor/IProperty';

@Injectable({
  providedIn: 'root'
})
export class FieldService {

  constructor(private editorService: EditorService, private templateTabService: TemplateTabService, private eventService: EventService) {
    // Init events
    eventService.on('Change-Field-Type', (property: IProperty) =>
      this.ChangeFieldType(property.parentTemplateID, property.parentFieldID, property.value));
  }

  public AddField(templateID: number) {
    const newField: IField = {
      ID: this.editorService.GetNewID(),
      IsCollapsed: false,
      Properties: {}
    };

    const currentTemplate: GameCharacterTemplate|GameObjectTemplate = this.templateTabService.FindTemplateByID(templateID);

    newField.ParentID = currentTemplate.id;
    newField.Properties.Name = {id: 0, value: 'New Field', type: PropertyTypes.string};

    currentTemplate.Fields.push(newField);

    this.ChangeFieldType(currentTemplate.id, newField.ID, FieldTypes.TextBox);
  }

  public CopyField(fieldToCopyID: number, templateID: number) {
    const currentTemplate: GameObjectTemplate|GameCharacterTemplate = this.templateTabService.FindTemplateByID(templateID);
    const fieldToCopy: IField = currentTemplate.Fields.find(obj => obj.ID === fieldToCopyID);
    const newField: IField = JSON.parse(JSON.stringify(fieldToCopy));

    newField.ID = this.editorService.GetNewID();

    this.templateTabService.SetParentFieldID(newField.Properties, newField.ID);

    currentTemplate.FieldValues[newField.ID] = currentTemplate.FieldValues[fieldToCopy.ID];

    currentTemplate.Fields.push(newField);
  }

  public DeleteField(fieldToDeleteID: number, templateID: number) {
    const currentObject: GameObjectTemplate|GameCharacterTemplate = this.templateTabService.FindTemplateByID(templateID);
    currentObject.Fields = currentObject.Fields.filter(obj => obj.ID !== fieldToDeleteID);
    delete currentObject.FieldValues[fieldToDeleteID];
    this.templateTabService.SelectObject(templateID);
  }

  public ChangeFieldType(templateID: number, fieldID: number, fieldType: FieldTypes) {
    const currentTemplate: GameCharacterTemplate|GameObjectTemplate = this.templateTabService.FindTemplateByID(templateID);
    const currentField: IField = currentTemplate.Fields.find(obj => obj.ID === fieldID);

    currentField.Properties.Type = {id: 1, value: fieldType, type: PropertyTypes.enum, enum: FieldTypes,
      changeFireEvent: 'Change-Field-Type'};
    currentField.Properties.Top = {id: 2, description: 'in px', value: 0, type: PropertyTypes.number};
    currentField.Properties.Left = {id: 3, description: 'in px', value: 0, type: PropertyTypes.number};

    for (const key in currentField.Properties) {
      if (key !== 'Name' && key !== 'Type' && key !== 'Top' && key !== 'Left') {
        // noinspection JSUnfilteredForInLoop
        delete currentField.Properties[key];
      }
    }

    switch (fieldType) {
      case FieldTypes.TextBox: {
        currentField.Properties.Label = {id: 4, value: 'TextBox', type: PropertyTypes.string};
        currentField.Properties.MaxLength = {id: 5, value: 20, type: PropertyTypes.number};
        currentField.Properties.Placeholder = {id: 6, value: 'Text Box', type: PropertyTypes.string};
        currentField.Properties.ReadOnly = {id: 7, value: false, type: PropertyTypes.boolean};
        currentField.Properties.Size = {id: 8, value: 20, type: PropertyTypes.number};

        currentTemplate.FieldValues[currentField.ID] = '';
        break;
      }
      case FieldTypes.TextArea: {
        currentField.Properties.Label = {id: 4, value: 'TextArea', type: PropertyTypes.string};
        currentField.Properties.Cols = {id: 5, value: 20, type: PropertyTypes.number};
        currentField.Properties.Rows = {id: 6, value: 20, type: PropertyTypes.number};
        currentField.Properties.MaxLength = {id: 7, value: 20, type: PropertyTypes.number};
        currentField.Properties.Placeholder = {id: 8, value: 'Text Area', type: PropertyTypes.string};
        currentField.Properties.ReadOnly = {id: 9, value: false, type: PropertyTypes.boolean};
        currentField.Properties.Resize = {id: 10, value: false, type: PropertyTypes.boolean};

        currentTemplate.FieldValues[currentField.ID] = '';
        break;
      }
      case FieldTypes.Number: {
        currentField.Properties.Label = {id: 4, value: 'Number', type: PropertyTypes.string};
        currentField.Properties.Min = {id: 5, value: '0', type: PropertyTypes.number};
        currentField.Properties.Max = {id: 6, value: '999', type: PropertyTypes.number};
        currentField.Properties.Step = {id: 7, value: '1', type: PropertyTypes.number};
        currentField.Properties.ReadOnly = {id: 8, value: false, type: PropertyTypes.boolean};

        currentTemplate.FieldValues[currentField.ID] = 0;
        break;
      }
      case FieldTypes.Select: {
        currentField.Properties.Label = {id: 4, value: 'Select', type: PropertyTypes.string};
        currentField.Properties.Options = {id: 5, value: ['Option'], type: PropertyTypes.options};

        currentTemplate.FieldValues[currentField.ID] = 'Option';
        break;
      }
      case FieldTypes.CheckBox: {
        currentField.Properties.Label = {id: 4, value: 'CheckBox', type: PropertyTypes.string};

        currentTemplate.FieldValues[currentField.ID] = false;
        break;
      }
      case FieldTypes.Radio: {
        currentField.Properties.Label = {id: 4, value: 'Radio', type: PropertyTypes.string};

        currentTemplate.FieldValues[currentField.ID] = false;
        break;
      }
      case FieldTypes.Range: {
        currentField.Properties.Label = {id: 4, value: 'Range', type: PropertyTypes.string};
        currentField.Properties.Min = {id: 5, value: '0', type: PropertyTypes.number};
        currentField.Properties.Max = {id: 6, value: '999', type: PropertyTypes.number};
        currentField.Properties.Step = {id: 7, value: '1', type: PropertyTypes.number};
        currentField.Properties.ReadOnly = {id: 8, value: false, type: PropertyTypes.boolean};

        currentTemplate.FieldValues[currentField.ID] = 0;
        break;
      }
      case FieldTypes.Table: {
        currentField.Properties.Label = {id: 4, value: 'Table', type: PropertyTypes.string};
        currentField.Properties.Rows = {id: 5, value: 10, type: PropertyTypes.number};
        currentField.Properties.Cols = {id: 6, value: 10, type: PropertyTypes.number};
        currentField.Properties.Width = {id: 6, description: 'in % oder px', value: '100%', type: PropertyTypes.string};
        currentField.Properties.TableStyle = {id: 7, value: TableStyles.StyleOne,
          type: PropertyTypes.enum, enum: TableStyles};

        currentTemplate.FieldValues[currentField.ID] = [];
        break;
      }
      case FieldTypes.Image: {
        currentField.Properties.Label = {id: 4, value: 'Table', type: PropertyTypes.string};
        currentField.Properties.Width = {id: 5, description: 'in % oder px', value: '100%', type: PropertyTypes.string};
        currentField.Properties.Height = {id: 6, description: 'in px', value: '', type: PropertyTypes.string};

        currentTemplate.FieldValues[currentField.ID] = '';
        break;
      }
    }
    this.templateTabService.SetParentTemplateID(currentField.Properties, templateID);
    this.templateTabService.SetParentFieldID(currentField.Properties, currentField.ID);
  }
}
