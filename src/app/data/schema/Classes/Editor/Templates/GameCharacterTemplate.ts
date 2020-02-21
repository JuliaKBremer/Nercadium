
import {IProperty} from '../../../Interfaces/Editor/IProperty';
import {IGameCharacterTemplate} from '../../../Interfaces/Editor/IGameCharacterTemplate';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';

export class GameCharacterTemplateTemplate implements IGameCharacterTemplate, IBaseGameEntity {
  Name: string;
  Properties: IProperty[];
  id: number;
  Description: string;

  GetEntityType(): EntityTypeEnum {
    return EntityTypeEnum.CharacterTemplate;
  }

}
