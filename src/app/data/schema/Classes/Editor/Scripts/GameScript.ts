import {IGameScript} from '../../../Interfaces/Editor/IGameScript';
import {IGameChapter} from '../../../Interfaces/Editor/IGameChapter';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {IProperties} from '../../../Interfaces/Editor/IProperty';

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

  EntityType: EntityTypeEnum = EntityTypeEnum.Script;
  Properties: IProperties;

}
