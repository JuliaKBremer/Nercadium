import {IGameObjectTemplate} from '../../../Interfaces/Editor/IGameObjectTemplate';
import {IProperty} from '../../../Interfaces/Editor/IProperty';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';

export class GameObjectTemplate implements IGameObjectTemplate, IBaseGameEntity {
  Name: string;

  // Entity's Tags
  public Tags: string[];

  Properties: IProperty[];
  id: number;
  Description: string;

  EntityType: EntityTypeEnum = EntityTypeEnum.ObjectTemplate;
}
