import {IGameScript} from '../../../Interfaces/Editor/IGameScript';
import {IGameChapter} from '../../../Interfaces/Editor/IGameChapter';

export class GameScript implements IGameScript {

  // ID des Script
  id: number;

  // Bezeichnung / Name des Skript
  Name: string;

  // Beschreibung
  Descripton: string;

  // Kapitel
  Chapters: IGameChapter[];

}
