import {IGameObjectTemplate} from '../../../Interfaces/Editor/IGameObjectTemplate';
import {IProperty} from '../../../Interfaces/Editor/IProperty';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';

export class GameObjectTemplate implements IGameObjectTemplate, IBaseGameEntity {
  Name: string;
  Properties: IProperty[];
  id: number;
  Description: string;

  GetEntityType(): EntityTypeEnum {
    return EntityTypeEnum.ObjectTemplate;
  }
}
