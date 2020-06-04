import { Injectable } from '@angular/core';
import {LibraryService} from '../../../core/service/localLibrary/library.service';
import {AdventureObject} from '../../../data/schema/Classes/Editor/Adventure/AdventureObject';
import {CharacterObject} from '../../../data/schema/Classes/Editor/Character/CharacterObject';
import {GameObject} from '../../../data/schema/Classes/Editor/Objects/GameObject';
import {SceneObject} from '../../../data/schema/Classes/Editor/Scene/SceneObject';
import {GameScript} from '../../../data/schema/Classes/Editor/Scripts/GameScript';
import {GameChapter} from '../../../data/schema/Classes/Editor/Chapter/GameChapter';
import {NoteObject} from '../../../data/schema/Classes/Editor/Scene/SceneNote';
import {GameObjectTemplate} from '../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {BehaviorSubject, Observable} from 'rxjs';
import {GameCharacterTemplate} from '../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {EntityTypeEnum} from '../../../data/schema/Classes/Storage/EntityTypeEnum';
import {IBaseGameEntity} from '../../../data/schema/Interfaces/Editor/IBaseGameEntity';
import {ChapterService} from './chapter.service';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  // TODO: set private
  Adventure: BehaviorSubject<AdventureObject[]>;
  Characters: BehaviorSubject<CharacterObject[]>;
  Objects: BehaviorSubject<GameObject[]>;
  Scenes: BehaviorSubject<SceneObject[]>;
  Scripts: BehaviorSubject<GameScript[]>;
  Chapters: BehaviorSubject<GameChapter[]>;
  Notes: BehaviorSubject<NoteObject[]>;
  ObjectTemplates: BehaviorSubject<GameObjectTemplate[]>;
  CharacterTemplates: BehaviorSubject<GameCharacterTemplate[]>;

  private selectedObject: BehaviorSubject<IBaseGameEntity>;

  // TODO: create editor ui service
  public data: {[key in EntityTypeEnum]?: {bSubject?: BehaviorSubject<IBaseGameEntity[]>, service?: IBaseService}} = {
    [EntityTypeEnum.Adventure] : {},
    [EntityTypeEnum.Character] : {},
    [EntityTypeEnum.Object] : {},
    [EntityTypeEnum.Scene] : {},
    [EntityTypeEnum.Script] : {},
    [EntityTypeEnum.Chapter] : {},
    [EntityTypeEnum.Note] : {},
    [EntityTypeEnum.ObjectTemplate] : {},
    [EntityTypeEnum.CharacterTemplate] : {}
  };

  private $currentSelectedEntityType: EntityTypeEnum = null;
  public get currentSelectedEntityType(): EntityTypeEnum {
    return this.$currentSelectedEntityType;
  }
  public set currentSelectedEntityType(entityType: EntityTypeEnum) {
    if (this.$currentSelectedEntityType === entityType) {
      this.$currentSelectedEntityType = null;
    } else {
      this.$currentSelectedEntityType = entityType;
    }
  }

  public togglePropertiesSidebar = false;

  constructor(private libraryService: LibraryService) {
    this.data.Adventure.bSubject = this.Adventure = new BehaviorSubject<AdventureObject[]>(null);
    this.data.Character.bSubject = this.Characters = new BehaviorSubject<CharacterObject[]>([]);
    this.data.Object.bSubject = this.Objects = new BehaviorSubject<GameObject[]>([]);
    this.data.Scene.bSubject = this.Scenes = new BehaviorSubject<SceneObject[]>([]);
    this.data.Script.bSubject = this.Scripts = new BehaviorSubject<GameScript[]>([]);
    this.data.Chapter.bSubject = this.Chapters = new BehaviorSubject<GameChapter[]>([]);
    this.data.Chapter.service = new ChapterService(this);
    this.data.Note.bSubject = this.Notes = new BehaviorSubject<NoteObject[]>([]);
    this.data.ObjectTemplate.bSubject = this.ObjectTemplates = new BehaviorSubject<GameObjectTemplate[]>([]);
    this.data.CharacterTemplate.bSubject = this.CharacterTemplates = new BehaviorSubject<GameCharacterTemplate[]>([]);

    this.selectedObject = new BehaviorSubject<any>(null);
  }

  public GetNewID(): number {
    return (Date.now() * 1000) + Math.floor(Math.random() * 1000);
  }

  public getSelectedObject(): Observable<IBaseGameEntity> {
    return this.selectedObject.asObservable();
  }
  public setSelectedObject(object: IBaseGameEntity) {
    this.selectedObject.next(object);
  }

  private GetDataFromLibrary() {
    this.Adventure.next(this.libraryService.Adventures);
    this.Characters.next(this.libraryService.Characters);
    this.Objects.next(this.libraryService.Objects);
    this.Scenes.next(this.libraryService.Scenes);
    this.Scripts.next(this.libraryService.Scripts);
    this.Chapters.next(this.libraryService.Chapters);
    this.Notes.next(this.libraryService.Notes);
    this.ObjectTemplates.next(this.libraryService.ObjectTemplates);
    this.CharacterTemplates.next(this.libraryService.CharacterTemplates);
  }

  public LoadPackage(path: string, name: string) {
    this.libraryService.LoadPackage(path, name);

    this.GetDataFromLibrary();
  }

  public SavePackage() {
    this.libraryService.SavePackage(this.Adventure.value[0].path, this.Adventure.value[0].Name);
  }
}
