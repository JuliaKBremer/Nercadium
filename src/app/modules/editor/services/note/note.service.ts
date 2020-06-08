import {IBaseService} from '../IBaseService';
import {IBaseGameEntity} from '../../../../data/schema/Interfaces/Editor/IBaseGameEntity';
import {EditorService} from '../editor/editor.service';
import {NoteObject} from '../../../../data/schema/Classes/Editor/Scene/SceneNote';
import {PropertyTypes} from '../../../../data/schema/Enums/property-types.enum';

export class NoteService implements IBaseService {

  constructor(private editorService: EditorService) { }

  New(): IBaseGameEntity {
    const newNote: NoteObject = new NoteObject();

    newNote.id = this.editorService.GetNewID();
    newNote.Text = '';
    newNote.Properties = {
      Name : {id: 0, value: 'New Object', type: PropertyTypes.string}
    };

    this.editorService.libraryService.Add(newNote);
    return newNote;
  }

  Copy(noteToCopy: NoteObject): IBaseGameEntity {
    const newNote: NoteObject = new NoteObject();

    newNote.id = this.editorService.GetNewID();
    newNote.Text = noteToCopy.Text;
    newNote.Properties = JSON.parse(JSON.stringify(noteToCopy.Properties));

    this.editorService.libraryService.Add(newNote);
    return newNote;
  }

  Delete(noteToDelete: NoteObject) {
    this.editorService.libraryService.Remove(noteToDelete);
  }
}
