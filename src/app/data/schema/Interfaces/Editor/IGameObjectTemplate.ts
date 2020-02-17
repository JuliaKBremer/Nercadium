import {IProperty} from './IProperty';

export interface IGameObjectTemplate {
  // ID des Objekt-Template
  id: number;

  // Name des Template
  Name: string;

  // Zugewiesene Eigenschaften für das Template
  Properties: IProperty[];
}
