import {IProperty} from './IProperty';
import {IGameObjectTemplate} from './IGameObjectTemplate';

export interface IGameObject {

  // ID des Objekt / Item .. whatever
  id: number;

  // Name des Objekts
  Name: string;

  // Beschreibung
  Descripton: string;

  // Zugewiesenen Werte / Stats .. whatever
  Properties: Array<IProperty>[];

  // Das zugewiesene Template
  ObjectTemplate: IGameObjectTemplate;
}
