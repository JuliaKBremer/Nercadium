import {INote} from '../../../Interfaces/Editor/INote';

export class NoteObject implements INote {

  // ID der Notiz
  id: number;

  // Name ... notwendig?!
  Name: string;

  // Text der Notiz
  Descripton: string;

}
