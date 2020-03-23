import {IGameObject} from '../../../Interfaces/Editor/IGameObject';
import {IProperties} from '../../../Interfaces/Editor/IProperty';
import {IGameObjectTemplate} from '../../../Interfaces/Editor/IGameObjectTemplate';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {PropertyTypes} from '../../../Enums/property-types.enum';

export class GameObject implements IGameObject, IBaseGameEntity {
  id: number;
  get Name() {
    return this.Properties.Name.value + ' ' + this.id;
  }
  Properties: IProperties = {};
  ObjectTemplate: IGameObjectTemplate;
  FieldValues: {[key: string]: any} = {};
  Description: string;
  EntityType: EntityTypeEnum = EntityTypeEnum.Object;

  // Entity's Tags
  public Tags: string[];

  constructor(objectToCopy?: GameObject) {
    if (objectToCopy) {
      this.id = objectToCopy.id;
      this.Properties = JSON.parse(JSON.stringify(objectToCopy.Properties));
      this.ObjectTemplate = objectToCopy.ObjectTemplate;
      this.FieldValues = JSON.parse(JSON.stringify(objectToCopy.FieldValues));
      this.Description = objectToCopy.Description;
    } else {
      this.Properties.Name = {id: 0, value: 'New Object', type: PropertyTypes.string};
    }
  }
}
