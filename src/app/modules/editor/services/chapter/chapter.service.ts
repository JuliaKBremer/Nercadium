import {EditorService} from '../editor/editor.service';
import {GameChapter} from '../../../../data/schema/Classes/Editor/Chapter/GameChapter';
import {PropertyTypes} from '../../../../data/schema/Enums/property-types.enum';
import {IBaseGameEntity} from '../../../../data/schema/Interfaces/Editor/IBaseGameEntity';
import {IBaseService} from '../IBaseService';

export class ChapterService implements IBaseService {

  constructor(private editorService: EditorService) { }

  New(): IBaseGameEntity {
    const newChapter: GameChapter = new GameChapter();

    newChapter.id = this.editorService.GetNewID();
    newChapter.Text = '';
    newChapter.Properties = {
      Name : {id: 0, value: 'New Object', type: PropertyTypes.string}

      //// Test
      // String : {id: 1, value: 'Lorem Ipsum', type: PropertyTypes.string},
      // Number : {id: 2, value: 1337, type: PropertyTypes.number},
      // Boolean : {id: 3, value: false, type: PropertyTypes.boolean},
      // Enum : {id: 4, value: 'asd', type: PropertyTypes.enum, enum: {asd: 'asd', qwe: 'qwe'}},
      // Options : {id: 5, value: [], type: PropertyTypes.options}
    };

    this.editorService.libraryService.Add(newChapter);
    return newChapter;
  }

  Copy(chapterToCopy: GameChapter): IBaseGameEntity {
    const newChapter: GameChapter = new GameChapter();

    newChapter.id = this.editorService.GetNewID();
    newChapter.Text = chapterToCopy.Text;
    newChapter.Properties = JSON.parse(JSON.stringify(chapterToCopy.Properties));

    this.editorService.libraryService.Add(newChapter);
    return newChapter;
  }

  Delete(chapterToDelete: GameChapter) {
    this.editorService.libraryService.Remove(chapterToDelete);
  }
}
