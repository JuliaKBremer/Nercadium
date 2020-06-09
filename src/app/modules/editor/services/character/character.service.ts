import {IBaseService} from '../IBaseService';
import {IBaseGameEntity} from '../../../../data/schema/Interfaces/Editor/IBaseGameEntity';
import {CharacterObject} from '../../../../data/schema/Classes/Editor/Character/CharacterObject';
import {EditorService} from '../editor/editor.service';
import {PropertyTypes} from '../../../../data/schema/Enums/property-types.enum';
import {IField} from '../../../../data/schema/Interfaces/Editor/IField';

export class CharacterService implements IBaseService {

  constructor(private editorService: EditorService) { }

  New(): IBaseGameEntity {
    const newChar: CharacterObject = new CharacterObject();

    newChar.id = this.editorService.GetNewID();
    newChar.Fields = [];
    newChar.FieldValues = {};
    newChar.Properties = {
      Name : {id: 0, value: 'New Object', type: PropertyTypes.string}
    };

    this.editorService.libraryService.Add(newChar);
    return newChar;
  }

  Copy(charToCopy: CharacterObject): IBaseGameEntity {
    const newChar: CharacterObject = new CharacterObject();

    newChar.id = this.editorService.GetNewID();
    newChar.Fields = [];
    newChar.FieldValues = {};
    newChar.Properties = JSON.parse(JSON.stringify(charToCopy.Properties));
    this.CopyFieldsFromObjectToObject(charToCopy, newChar);

    this.editorService.libraryService.Add(newChar);
    return newChar;
  }

  public CopyFieldsFromObjectToObject(oriObject: IBaseGameEntity, newObject: IBaseGameEntity) {
    oriObject.Fields.forEach(field => {
      const oriFieldValue = oriObject.FieldValues[field.ID];

      const newField: IField = {
        ID: this.editorService.GetNewID(),
        IsCollapsed: false,
        ParentID: newObject.id,
        Properties: JSON.parse(JSON.stringify(field.Properties))
      };

      for (const key in newField.Properties) {
        if (newField.Properties[key]) {
          newField.Properties[key].parentFieldID = newField.ID;
          newField.Properties[key].parentObjectID = newField.ParentID;
        }
      }

      newObject.Fields.push(newField);

      newObject.FieldValues[newField.ID] = JSON.parse(JSON.stringify(oriFieldValue));
    });
  }

  Delete(objectToDelete: CharacterObject) {
    this.editorService.libraryService.Remove(objectToDelete);
  }
}
