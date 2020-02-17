// tslint:disable-next-line:no-empty-interface
import {IGameChapter} from './IGameChapter';

export interface IGameScript {

  // ID des Skript
  id: number;

  // Name / Bezeichnung des Skript
  Name: string;

  // Beschreibung des Skript
  Descripton: string;

  // Kapitel innerhalb des Skript
  Chapters: IGameChapter[];
}
