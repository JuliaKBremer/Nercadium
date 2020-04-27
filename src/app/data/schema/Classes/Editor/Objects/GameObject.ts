import {IGameObject} from '../../../Interfaces/Editor/IGameObject';
import {IProperties} from '../../../Interfaces/Editor/IProperty';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {PropertyTypes} from '../../../Enums/property-types.enum';
import {FieldTypes} from '../../../Enums/field-types.enum';

export class GameObject implements IGameObject, IBaseGameEntity {
  id: number;
  get Name(): string {
    return this.Properties.Name.value + ' ' + this.id;
  }
  Properties: IProperties = {};
   get ObjectTemplateID(): number {
     return this.Properties.Template.value;
   }
  FieldValues: {[key: string]: any} = {};
   FieldTypes: {[key: string]: FieldTypes} = {};
  Description: string;
  EntityType: EntityTypeEnum = EntityTypeEnum.Object;

  // Entity's Tags
  public Tags: string[];

  constructor(objectToCopy?: GameObject) {
    if (objectToCopy) {
      this.id = objectToCopy.id;
      this.Properties = JSON.parse(JSON.stringify(objectToCopy.Properties));
      this.FieldValues = JSON.parse(JSON.stringify(objectToCopy.FieldValues));
      this.FieldTypes = JSON.parse(JSON.stringify(objectToCopy.FieldTypes));
      this.Description = objectToCopy.Description;
    } else {
      this.Properties.Name = {id: 0, value: 'New Object', type: PropertyTypes.string};
      this.Properties.Template = {id: 1, value: null, type: PropertyTypes.enum, enum: {}, changeFireEvent: 'Change-Template'};
    }
  }
}
