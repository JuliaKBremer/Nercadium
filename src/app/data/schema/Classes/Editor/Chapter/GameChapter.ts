import {IGameChapter} from '../../../Interfaces/Editor/IGameChapter';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';

export class GameChapter implements IGameChapter, IBaseGameEntity {

  // ID
  id: number;

  // Kapitel Beschreibung im Kurztext
  Description: string;

  // Name des Kapitel
  Name: string;

  // Text des Kapitel
  Text: string;

  GetEntityType(): EntityTypeEnum {
    return EntityTypeEnum.Chapter;
  }

}
