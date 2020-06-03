import {IProperties} from '../../../Interfaces/Editor/IProperty';
import {IGameCharacterTemplate} from '../../../Interfaces/Editor/IGameCharacterTemplate';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {IField} from '../../../Interfaces/Editor/IField';
import {PropertyTypes} from '../../../Enums/property-types.enum';

export class GameCharacterTemplate implements IGameCharacterTemplate, IBaseGameEntity {
  id: number;
  Name: string;
  Properties: IProperties = {};
  Fields: IField[] = [];
  FieldValues: {[key: string]: any} = {};
  Description: string;

  constructor(characterTemplateToCopy?: GameCharacterTemplate) {
    if (characterTemplateToCopy) {
      this.id = characterTemplateToCopy.id;
      this.Name = characterTemplateToCopy.Name;
      this.Properties = JSON.parse(JSON.stringify(characterTemplateToCopy.Properties));
      this.Fields = JSON.parse(JSON.stringify(characterTemplateToCopy.Fields));
      this.FieldValues = JSON.parse(JSON.stringify(characterTemplateToCopy.FieldValues));
      this.Description = characterTemplateToCopy.Description;
    } else {
      this.Properties.Name = {id: 0, value: 'New Character Template', type: PropertyTypes.string};
    }
  }

  // Entity's Tags
  public Tags: string[];

  EntityType: EntityTypeEnum = EntityTypeEnum.CharacterTemplate;

}
