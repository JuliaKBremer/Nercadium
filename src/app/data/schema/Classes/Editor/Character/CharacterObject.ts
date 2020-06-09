import {IGameCharacter} from '../../../Interfaces/Editor/IGameCharacter';
import {IProperties} from '../../../Interfaces/Editor/IProperty';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {IField} from '../../../Interfaces/Editor/IField';

export class CharacterObject implements IGameCharacter, IBaseGameEntity {

  // ID
  id: number;

  // Get Filename
  get Name(): string {
    return this.Properties.Name.value + ' ' + this.id;
  }
  set Name(name: string) {
    this.Properties.Name.value = name;
  }

  // Discriminator
  EntityType: EntityTypeEnum = EntityTypeEnum.Character;

  // Properties
  Properties: IProperties;

  // Fields
  Fields: IField[];

  // Fieldvalues
  FieldValues: {[fieldID: string]: any};
}
