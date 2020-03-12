import {IGameScript} from '../../../Interfaces/Editor/IGameScript';
import {IGameChapter} from '../../../Interfaces/Editor/IGameChapter';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';

export class GameScript implements IGameScript, IBaseGameEntity {

  // ID des Script
  id: number;

  // Entity's Tags
  public Tags: string[];

  // Bezeichnung / Name des Skript
  Name: string;

  // Beschreibung
  Description: string;

  // Kapitel
  Chapters: IGameChapter[];

  GetEntityType(): EntityTypeEnum {
    return EntityTypeEnum.Script;
  }

}
