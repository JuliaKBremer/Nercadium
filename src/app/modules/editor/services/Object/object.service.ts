import {IBaseService} from '../IBaseService';
import {IBaseGameEntity} from '../../../../data/schema/Interfaces/Editor/IBaseGameEntity';
import {EditorService} from '../editor/editor.service';
import {PropertyTypes} from '../../../../data/schema/Enums/property-types.enum';
import {IField} from '../../../../data/schema/Interfaces/Editor/IField';
import {GameObject} from '../../../../data/schema/Classes/Editor/Objects/GameObject';

export class ObjectService implements IBaseService {

  constructor(private editorService: EditorService) { }

  New(): IBaseGameEntity {
    const newObj: GameObject = new GameObject();

    newObj.id = this.editorService.GetNewID();
    newObj.Fields = [];
    newObj.FieldValues = {};
    newObj.Properties = {
      Name : {id: 0, value: 'New Object', type: PropertyTypes.string}
    };

    this.editorService.libraryService.Add(newObj);
    return newObj;
  }

  Copy(objToCopy: GameObject): IBaseGameEntity {
    const newObj: GameObject = new GameObject();

    newObj.id = this.editorService.GetNewID();
    newObj.Fields = [];
    newObj.FieldValues = {};
    newObj.Properties = JSON.parse(JSON.stringify(objToCopy.Properties));
    this.CopyFieldsFromObjectToObject(objToCopy, newObj);

    this.editorService.libraryService.Add(newObj);
    return newObj;
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

  Delete(objectToDelete: GameObject) {
    this.editorService.libraryService.Remove(objectToDelete);
  }
}
