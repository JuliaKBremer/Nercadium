import {IGameChapter} from '../../../Interfaces/Editor/IGameChapter';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {IProperties} from '../../../Interfaces/Editor/IProperty';

export class GameChapter implements IGameChapter, IBaseGameEntity {

  // ID
  id: number;

  // Get Filename
  get Name(): string {
    return this.Properties.Name.value + ' ' + this.id;
  }
  set Name(name: string) {
    this.Properties.Name.value = name;
  }

  // Text des Kapitel
  Text: string;

  // Discriminator
  EntityType: EntityTypeEnum = EntityTypeEnum.Chapter;

  // Properties
  Properties: IProperties;
}
