import {IGameChapter} from '../../../Interfaces/Editor/IGameChapter';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {IProperties} from '../../../Interfaces/Editor/IProperty';
import {PropertyTypes} from '../../../Enums/property-types.enum';

export class GameChapter implements IGameChapter, IBaseGameEntity {

  // ID
  id: number;

  // Entity's Tags
  public Tags: string[];

  // Kapitel Beschreibung im Kurztext
  Description: string;

  // Name des Kapitel
  get Name(): string {
    return this.Properties.Name.value + ' ' + this.id;
  }
  set Name(name: string) {
    this.Properties.Name.value = name;
  }

  // Text des Kapitel
  Text: string;

  EntityType: EntityTypeEnum = EntityTypeEnum.Chapter;

  Properties: IProperties = {};

  constructor() {
    this.Properties.Name = {id: 0, value: 'New Object', type: PropertyTypes.string};

    // Test
    this.Properties.String = {id: 1, value: 'Lorem Ipsum', type: PropertyTypes.string};
    this.Properties.Number = {id: 2, value: 1337, type: PropertyTypes.number};
    this.Properties.Boolean = {id: 3, value: false, type: PropertyTypes.boolean};
    this.Properties.Enum = {id: 4, value: 'asd', type: PropertyTypes.enum, enum: {asd: 'asd', qwe: 'qwe'}};
    this.Properties.Options = {id: 5, value: [], type: PropertyTypes.options};
  }
}
