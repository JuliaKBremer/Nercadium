import {IProperties} from './IProperty';

export interface INote {
  // ID des Kapitel
  id: number;

  // Name / Bezeichung des Kapitel
  Name: string;

  // Text / Inhalt
  Text: string;

  Properties: IProperties;
}
