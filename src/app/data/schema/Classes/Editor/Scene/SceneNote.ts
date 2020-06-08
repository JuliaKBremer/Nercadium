import {INote} from '../../../Interfaces/Editor/INote';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {IProperties} from '../../../Interfaces/Editor/IProperty';

export class NoteObject implements INote, IBaseGameEntity {

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
  EntityType: EntityTypeEnum = EntityTypeEnum.Note;

  // Properties
  Properties: IProperties;
}
