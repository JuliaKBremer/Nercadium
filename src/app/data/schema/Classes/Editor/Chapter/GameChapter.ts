import {IGameChapter} from '../../../Interfaces/Editor/IGameChapter';

export class GameChapter implements IGameChapter {

  // ID
  id: number;

  // Kapitel Beschreibung im Kurztext
  Descripton: string;

  // Name des Kapitel
  Name: string;

  // Text des Kapitel
  Text: string;

}
