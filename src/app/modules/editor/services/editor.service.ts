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
import {BehaviorSubject} from 'rxjs';
import {GameCharacterTemplate} from '../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {EntityTypeEnum} from '../../../data/schema/Classes/Storage/EntityTypeEnum';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  Adventure: BehaviorSubject<AdventureObject>;
  Characters: BehaviorSubject<CharacterObject[]>;
  Objects: BehaviorSubject<GameObject[]>;
  Scenes: BehaviorSubject<SceneObject[]>;
  Scripts: BehaviorSubject<GameScript[]>;
  Chapters: BehaviorSubject<GameChapter[]>;
  Notes: BehaviorSubject<NoteObject[]>;
  ObjectTemplates: BehaviorSubject<GameObjectTemplate[]>;
  CharacterTemplates: BehaviorSubject<GameCharacterTemplate[]>;

  // TODO: create editor ui service
  public data: {[key in EntityTypeEnum]?: {bSubject?: BehaviorSubject<any>, service?: any}} = {
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

  private $currentSidebarLeft: EntityTypeEnum = null;
  public get currentSidebarLeft(): EntityTypeEnum {
    return this.$currentSidebarLeft;
  }
  public set currentSidebarLeft(entityType: EntityTypeEnum) {
    if (this.$currentSidebarLeft === entityType) {
      this.$currentSidebarLeft = null;
    } else {
      this.$currentSidebarLeft = entityType;
    }
  }

  public togglePropertiesSidebar: boolean;

  constructor(private libraryService: LibraryService) {
    this.data.Adventure.bSubject = this.Adventure = new BehaviorSubject<AdventureObject>(null);
    this.data.Chapter.bSubject = this.Characters = new BehaviorSubject<CharacterObject[]>([]);
    this.data.Object.bSubject = this.Objects = new BehaviorSubject<GameObject[]>([]);
    this.data.Scene.bSubject = this.Scenes = new BehaviorSubject<SceneObject[]>([]);
    this.data.Script.bSubject = this.Scripts = new BehaviorSubject<GameScript[]>([]);
    this.data.Chapter.bSubject = this.Chapters = new BehaviorSubject<GameChapter[]>([]);
    this.data.Note.bSubject = this.Notes = new BehaviorSubject<NoteObject[]>([]);
    this.data.ObjectTemplate.bSubject = this.ObjectTemplates = new BehaviorSubject<GameObjectTemplate[]>([]);
    this.data.CharacterTemplate.bSubject = this.CharacterTemplates = new BehaviorSubject<GameCharacterTemplate[]>([]);
  }

  public GetNewID(): number {
    return (Date.now() * 1000) + Math.floor(Math.random() * 1000);
  }

  private GetDataFromLibrary() {
    this.Adventure.next(this.libraryService.Adventures[0]);
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
    this.libraryService.SavePackage(this.Adventure.value.path, this.Adventure.value.Name);
  }
}
