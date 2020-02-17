import {IProperty} from './IProperty';

export interface IGameCharacterTemplate {
  // ID des Templates
  id: number;

  // Name des Templates
  Name: string;

  // Voralge der Eigenschaften
  Properties: IProperty[];
}
