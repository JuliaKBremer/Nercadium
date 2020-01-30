import {IGameObject} from '../../../Interfaces/Editor/IGameObject';
import {IProperty} from '../../../Interfaces/Editor/IProperty';
import {IGameObjectTemplate} from '../../../Interfaces/Editor/IGameObjectTemplate';

class GameObject implements IGameObject {
  Descripton: string;
  Name: string;
  Properties: Array<IProperty>[];
  ObjectTemplate: IGameObjectTemplate;
  id: number;
}
