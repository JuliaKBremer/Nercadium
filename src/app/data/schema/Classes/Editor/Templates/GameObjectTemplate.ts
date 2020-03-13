import {IGameObjectTemplate} from '../../../Interfaces/Editor/IGameObjectTemplate';
import {IProperties} from '../../../Interfaces/Editor/IProperty';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {IField} from '../../../Interfaces/Editor/IField';
import {PropertyTypes} from '../../../Enums/property-types.enum';

export class GameObjectTemplate implements IGameObjectTemplate, IBaseGameEntity {
  id: number;
  Name: string;
  Properties: IProperties = {};
  Fields: IField[] = [];
  FieldValues: {[key: string]: any} = {};
  Description: string;
  EntityType: EntityTypeEnum = EntityTypeEnum.ObjectTemplate;

  // Entity's Tags
  public Tags: string[];


  constructor(objectTemplateToCopy?: GameObjectTemplate) {
    if (objectTemplateToCopy) {
      this.id = objectTemplateToCopy.id;
      this.Name = objectTemplateToCopy.Name;
      this.Properties = JSON.parse(JSON.stringify(objectTemplateToCopy.Properties));
      this.Fields = JSON.parse(JSON.stringify(objectTemplateToCopy.Fields));
      this.FieldValues = JSON.parse(JSON.stringify(objectTemplateToCopy.FieldValues));
      this.Description = objectTemplateToCopy.Description;
    } else {
      this.Properties.Name = {id: 0, value: 'New Object Template', type: PropertyTypes.string};
    }
  }


}
