
import {IProperty} from '../../../Interfaces/Editor/IProperty';
import {IGameCharacterTemplate} from '../../../Interfaces/Editor/IGameCharacterTemplate';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';

export class GameCharacterTemplate implements IGameCharacterTemplate, IBaseGameEntity {
  Name: string;
  Properties: IProperty[];
  id: number;
  Description: string;

  // Entity's Tags
  public Tags: string[];

  EntityType: EntityTypeEnum = EntityTypeEnum.CharacterTemplate;

}
