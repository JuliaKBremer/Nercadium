import {IGameObject} from '../../../Interfaces/Editor/IGameObject';
import {IProperty} from '../../../Interfaces/Editor/IProperty';
import {IGameObjectTemplate} from '../../../Interfaces/Editor/IGameObjectTemplate';

export class GameObject implements IGameObject {

  // ID des Objekt
  id: number;

  // Name
  Name: string;

  // Beschreibung
  Descripton: string;

  // Zugewiesene Werte & Eigenschaften
  Properties: Array<IProperty>[];

  // Template das für dieses Objekt verwendet wird.
  ObjectTemplate: IGameObjectTemplate;

}
