import {Injectable} from '@angular/core';
import {PropertyTypes} from '../../../../data/schema/Enums/property-types.enum';
import {IField} from '../../../../data/schema/Interfaces/Editor/IField';
import {FieldTypes} from '../../../../data/schema/Enums/field-types.enum';
import {BehaviorSubject} from 'rxjs';
import {GameObjectTemplate} from '../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {GameCharacterTemplate} from '../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';

@Injectable({
  providedIn: 'root'
})
export class TemplateTabService {
  constructor() {
    this.characterTemplateObjects = new BehaviorSubject<GameCharacterTemplate[]>([]);
    this.objectTemplateObjects = new BehaviorSubject<GameObjectTemplate[]>([]);
    this.selectedObject = new BehaviorSubject<GameObjectTemplate|GameCharacterTemplate>(null);
  }

  // TODO: Get templates from storage. Get next id´s from storage.
  private characterTemplateObjects: BehaviorSubject<GameCharacterTemplate[]>;
  private objectTemplateObjects: BehaviorSubject<GameObjectTemplate[]>;
  private nextTemplateID = 0;
  private nextFieldID = 0;

  private selectedObject: BehaviorSubject<GameObjectTemplate|GameCharacterTemplate>;

  private FindTemplateByID(templateToFindID: number): GameObjectTemplate|GameCharacterTemplate {
    if (this.characterTemplateObjects.value.find(obj => obj.id === templateToFindID)) {
      return this.characterTemplateObjects.value.find(obj => obj.id === templateToFindID);
    } else if (this.objectTemplateObjects.value.find(obj => obj.id === templateToFindID)) {
      return this.objectTemplateObjects.value.find(obj => obj.id === templateToFindID);
    }

    return null;
  }

  public GetObjectTemplatesObservable() {
    return this.objectTemplateObjects.asObservable();
  }

  public GetCharacterTemplatesObservable() {
    return this.characterTemplateObjects.asObservable();
  }

  public GetSelectedObjectObservable() {
    return this.selectedObject.asObservable();
  }

  public SelectObject(templateToSelect: number) {
    this.selectedObject.next(this.FindTemplateByID(templateToSelect));
  }

  public AddCharacterTemplate() {
    const newCharacterTemplate: GameCharacterTemplate = new GameCharacterTemplate();
    newCharacterTemplate.id = this.nextTemplateID++;
    this.characterTemplateObjects.value.push(newCharacterTemplate);
  }

  public AddObjectTemplate() {
    const newObjectTemplate: GameObjectTemplate = new GameObjectTemplate();
    newObjectTemplate.id = this.nextTemplateID++;
    this.objectTemplateObjects.value.push(newObjectTemplate);
  }

  public CopyTemplate(templateToCopyID: number) {
    const templateToCopy: GameObjectTemplate|GameCharacterTemplate = this.FindTemplateByID(templateToCopyID);

    if (templateToCopy instanceof GameCharacterTemplate) {
      const newTemplate: GameCharacterTemplate = new GameCharacterTemplate(templateToCopy);
      newTemplate.id = this.nextTemplateID++;
      this.characterTemplateObjects.value.push(newTemplate);
    } else {
      const newTemplate: GameObjectTemplate = new GameObjectTemplate(templateToCopy);
      newTemplate.id = this.nextTemplateID++;
      this.objectTemplateObjects.value.push(newTemplate);
    }
  }

  public DeleteTemplate(templateToDeleteID: number) {
    if (this.selectedObject.value && templateToDeleteID === this.selectedObject.value.id) {
      this.selectedObject.next(null);
    }

    const templateToDelete: GameCharacterTemplate|GameObjectTemplate = this.FindTemplateByID(templateToDeleteID);

    if (templateToDelete instanceof GameCharacterTemplate) {
      const currentTemplates: GameCharacterTemplate[] = this.characterTemplateObjects.value
        .filter(obj => obj.id !== templateToDeleteID);

      this.characterTemplateObjects.next(currentTemplates);
    } else {
      const currentTempaltes: GameObjectTemplate[] = this.objectTemplateObjects.value
        .filter(obj => obj.id !== templateToDeleteID);

      this.objectTemplateObjects.next(currentTempaltes);
    }
  }

  public AddField(templateID: number) {
    const newField: IField = {
      ID: this.nextFieldID++,
      IsCollapsed: false,
      Properties: {}
    };

    const currentTemplate: GameCharacterTemplate|GameObjectTemplate = this.FindTemplateByID(templateID);

    newField.Properties.Name = {id: 0, value: 'New Field', type: PropertyTypes.string};

    currentTemplate.Fields.push(newField);

    this.ChangeFieldType(currentTemplate.id, newField.ID, FieldTypes.textBox);
  }

  public CopyField({fieldID: fieldToCopyID, objectID: templateID}) {
    const currentTemplate: GameObjectTemplate|GameCharacterTemplate = this.FindTemplateByID(templateID);
    const fieldToCopy: IField = currentTemplate.Fields.find(obj => obj.ID === fieldToCopyID);
    const newField: IField = JSON.parse(JSON.stringify(fieldToCopy));

    newField.ID = this.nextFieldID++;

    currentTemplate.FieldValues[newField.ID] = currentTemplate.FieldValues[fieldToCopy.ID];

    currentTemplate.Fields.push(newField);
  }

  public DeleteField({fieldID: fieldToDeleteID, objectID: templateID}) {
    const currentObject: GameObjectTemplate|GameCharacterTemplate = this.FindTemplateByID(templateID);
    currentObject.Fields = currentObject.Fields.filter(obj => obj.ID !== fieldToDeleteID);
    delete currentObject.FieldValues[fieldToDeleteID];
    this.selectedObject.next(currentObject);
  }

  public ChangeFieldType(templateID: number, fieldID: number, fieldType: FieldTypes) {
    const currentTemplate: GameCharacterTemplate|GameObjectTemplate = this.FindTemplateByID(templateID);
    const currentField: IField = currentTemplate.Fields.find(obj => obj.ID === fieldID);

    currentField.Properties.Type = {id: 1, value: fieldType, type: PropertyTypes.enum, enum: FieldTypes};

    for (const key in currentField.Properties) {
      if (key !== 'Name' && key !== 'Type') {
        // noinspection JSUnfilteredForInLoop
        delete currentField.Properties[key];
      }
    }

    // TODO: add end delete properties depending on fieldType.
    switch (fieldType) {
      case FieldTypes.textBox: {
        currentField.Properties.Label = {id: 2, value: 'Label', type: PropertyTypes.string};
        currentField.Properties.MaxLength = {id: 3, value: 20, type: PropertyTypes.number};
        currentField.Properties.Placeholder = {id: 5, value: 'Text Box', type: PropertyTypes.string};
        currentField.Properties.ReadOnly = {id: 6, value: false, type: PropertyTypes.boolean};
        currentField.Properties.Size = {id: 7, value: 20, type: PropertyTypes.number};

        currentTemplate.FieldValues[currentField.ID] = '';
        break;
      }
      case FieldTypes.textArea: {
        currentField.Properties.Label = {id: 2, value: 'Label', type: PropertyTypes.string};
        currentField.Properties.Cols = {id: 3, value: 20, type: PropertyTypes.number};
        currentField.Properties.Rows = {id: 4, value: 20, type: PropertyTypes.number};
        currentField.Properties.MaxLength = {id: 5, value: 20, type: PropertyTypes.number};
        currentField.Properties.Placeholder = {id: 7, value: 'Text Area', type: PropertyTypes.string};
        currentField.Properties.ReadOnly = {id: 8, value: false, type: PropertyTypes.boolean};
        currentField.Properties.Resize = {id: 9, value: false, type: PropertyTypes.boolean};

        currentTemplate.FieldValues[currentField.ID] = '';
        break;
      }
      case FieldTypes.number: {
        currentField.Properties.Label = {id: 2, value: 'Label', type: PropertyTypes.string};
        currentField.Properties.Min = {id: 3, value: '0', type: PropertyTypes.number};
        currentField.Properties.Max = {id: 4, value: '999', type: PropertyTypes.number};
        currentField.Properties.Step = {id: 5, value: '1', type: PropertyTypes.number};
        currentField.Properties.ReadOnly = {id: 6, value: false, type: PropertyTypes.boolean};

        currentTemplate.FieldValues[currentField.ID] = 0;
        break;
      }
      // TODO: Select
      // case FieldTypes.select: {
      //   currentTemplate.FieldValues[currentField.ID] = {value: 0, options: ['']};
      //   break;
      // }
      case FieldTypes.checkBox: {
        currentField.Properties.Label = {id: 2, value: 'Label', type: PropertyTypes.string};

        currentTemplate.FieldValues[currentField.ID] = false;
        break;
      }
      case FieldTypes.radio: {
        currentField.Properties.Label = {id: 2, value: 'Label', type: PropertyTypes.string};

        currentTemplate.FieldValues[currentField.ID] = false;
        break;
      }
      case FieldTypes.range: {
        currentField.Properties.Label = {id: 2, value: 'Label', type: PropertyTypes.string};
        currentField.Properties.Min = {id: 3, value: '0', type: PropertyTypes.number};
        currentField.Properties.Max = {id: 4, value: '999', type: PropertyTypes.number};
        currentField.Properties.Step = {id: 5, value: '1', type: PropertyTypes.number};
        currentField.Properties.ReadOnly = {id: 6, value: false, type: PropertyTypes.boolean};

        currentTemplate.FieldValues[currentField.ID] = 0;
        break;
      }
      // TODO: Table
      // case FieldTypes.table: {
      //   currentTemplate.FieldValues[currentField.ID] = {};
      //   break;
      // }
    }

  }
}
