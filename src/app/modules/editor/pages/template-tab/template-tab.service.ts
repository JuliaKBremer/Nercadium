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

  // Dummy
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
      Discriminator: 'I-AM-Field',
      ID: this.nextFieldID++,
      IsCollapsed: false,
      Properties: {}
    };

    newField.Properties.Name = {id: 0, value: 'New Field', type: PropertyTypes.string};
    newField.Properties.Type = {id: 1, value: FieldTypes.textBox, type: PropertyTypes.enum, enum: FieldTypes};

    const currentTemplate: GameCharacterTemplate|GameObjectTemplate = this.FindTemplateByID(templateID);
    currentTemplate.FieldValues[newField.ID] = 'TexBox';
    currentTemplate.Fields.push(newField);
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
}
