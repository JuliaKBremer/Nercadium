import {IProperties} from './IProperty';
import {IGameObjectTemplate} from './IGameObjectTemplate';

export interface IGameObject {
  // ID des Objekt / Item .. whatever
  id: number;

  // Name des Objekts
  Name: string;

  // Beschreibung
  Description: string;

  // Zugewiesenen Werte / Stats .. whatever
  Properties: IProperties;

  // Das zugewiesene Template
  ObjectTemplateID: number;

  // Field values
  FieldValues: {[key: string]: any};
}
