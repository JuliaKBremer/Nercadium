import {INote} from '../../../Interfaces/Editor/INote';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';

export class NoteObject implements INote, IBaseGameEntity {

  // ID der Notiz
  id: number;

  // Entity's Tags
  public Tags: string[];

  // Name ... notwendig?!
  Name: string;

  // Text der Notiz
  Description: string;

  EntityType: EntityTypeEnum = EntityTypeEnum.Note;

}
