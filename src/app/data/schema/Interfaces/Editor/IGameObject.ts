import {IProperty} from './IProperty';
import {IGameObjectTemplate} from './IGameObjectTemplate';

export interface IGameObject {
  id: number;
  Name: string;
  Descripton: string;
  Properties: Array<IProperty>[];
  ObjectTemplate: IGameObjectTemplate;
}
