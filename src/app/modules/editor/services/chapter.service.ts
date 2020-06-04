import {EditorService} from './editor.service';
import {GameChapter} from '../../../data/schema/Classes/Editor/Chapter/GameChapter';

export class ChapterService implements IBaseService {

  constructor(private editorService: EditorService) { }

  New() {
    const chapters = this.editorService.data.Chapter.bSubject.value;
    const newChapter: GameChapter = new GameChapter();

    newChapter.id = this.editorService.GetNewID();
    newChapter.Name = 'Chapter ' + newChapter.id;

    chapters.push(newChapter);
  }

  Copy(chapterToCopy: GameChapter) {
    const chapters = this.editorService.data.Chapter.bSubject.value;
    const newChapter: GameChapter = new GameChapter();

    newChapter.id = this.editorService.GetNewID();
    newChapter.Name = chapterToCopy.Name;

    chapters.push(newChapter);
  }

  Delete(chapterToDelete: GameChapter) {
    const chapters = this.editorService.data.Chapter.bSubject.value;
    const indexOfChapterToDelete = chapters.indexOf(chapterToDelete);
    chapters.splice(indexOfChapterToDelete, 1);
  }
}
