import {INote} from '../../../Interfaces/Editor/INote';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';

export class NoteObject implements INote, IBaseGameEntity {

  // ID der Notiz
  id: number;

  // Name ... notwendig?!
  Name: string;

  // Text der Notiz
  Description: string;

  GetEntityType(): number {
    return EntityTypeEnum.Note;
  }

}
