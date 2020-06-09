import { Injectable } from '@angular/core';
import {LibraryService} from '../../../../core/service/localLibrary/library.service';
import {AdventureObject} from '../../../../data/schema/Classes/Editor/Adventure/AdventureObject';
import {CharacterObject} from '../../../../data/schema/Classes/Editor/Character/CharacterObject';
import {GameObject} from '../../../../data/schema/Classes/Editor/Objects/GameObject';
import {SceneObject} from '../../../../data/schema/Classes/Editor/Scene/SceneObject';
import {GameScript} from '../../../../data/schema/Classes/Editor/Scripts/GameScript';
import {GameChapter} from '../../../../data/schema/Classes/Editor/Chapter/GameChapter';
import {NoteObject} from '../../../../data/schema/Classes/Editor/Scene/SceneNote';
import {GameObjectTemplate} from '../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {BehaviorSubject, Observable} from 'rxjs';
import {GameCharacterTemplate} from '../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {EntityTypeEnum} from '../../../../data/schema/Classes/Storage/EntityTypeEnum';
import {IBaseGameEntity} from '../../../../data/schema/Interfaces/Editor/IBaseGameEntity';
import {ChapterService} from '../chapter/chapter.service';
import {AdventuresManagerService} from '../../../../core/service/adventures/adventures-manager.service';
import {IBaseService} from '../IBaseService';
import {NoteService} from '../note/note.service';
import {SceneService} from '../scene/scene.service';
import {CharacterService} from '../character/character.service';

export enum RightSidebarStateEnum {
  Properties = 'Properties',
  Fields = 'Fields',
  none = 'none'
}

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

  private $currentSelectedRightState: RightSidebarStateEnum = RightSidebarStateEnum.none;
  public get currentSelectedRightState(): RightSidebarStateEnum {
    return this.$currentSelectedRightState;
  }
  public set currentSelectedRightState(state: RightSidebarStateEnum) {
    if (this.$currentSelectedRightState === state) {
      this.$currentSelectedRightState = RightSidebarStateEnum.none;
    } else {
      this.$currentSelectedRightState = state;
    }
  }

  constructor(public libraryService: LibraryService, private adventuresManagerService: AdventuresManagerService) {
    this.data.Adventure.bSubject = this.Adventure = new BehaviorSubject<AdventureObject[]>(null);
    this.data.Character.bSubject = this.Characters = new BehaviorSubject<CharacterObject[]>([]);
    this.data.Character.service = new CharacterService(this);
    this.data.Object.bSubject = this.Objects = new BehaviorSubject<GameObject[]>([]);
    this.data.Scene.bSubject = this.Scenes = new BehaviorSubject<SceneObject[]>([]);
    this.data.Scene.service = new SceneService(this);
    this.data.Script.bSubject = this.Scripts = new BehaviorSubject<GameScript[]>([]);
    this.data.Chapter.bSubject = this.Chapters = new BehaviorSubject<GameChapter[]>([]);
    this.data.Chapter.service = new ChapterService(this);
    this.data.Note.bSubject = this.Notes = new BehaviorSubject<NoteObject[]>([]);
    this.data.Note.service = new NoteService(this);
    this.data.ObjectTemplate.bSubject = this.ObjectTemplates = new BehaviorSubject<GameObjectTemplate[]>([]);
    this.data.CharacterTemplate.bSubject = this.CharacterTemplates = new BehaviorSubject<GameCharacterTemplate[]>([]);

    this.selectedObject = new BehaviorSubject<IBaseGameEntity>(null);
  }

  public GetNewID(): number {
    return (Date.now() * 1000) + Math.floor(Math.random() * 1000);
  }

  public GetSelectedObjectAsObservable(): Observable<IBaseGameEntity> {
    return this.selectedObject.asObservable();
  }
  public GetSelectedObject(): IBaseGameEntity {
    return this.selectedObject.value;
  }
  public SetSelectedObject(object: IBaseGameEntity) {
    this.selectedObject.next(object);
  }

  public NewObject() {
    const newObject = this.data[this.currentSelectedEntityType].service.New();

    this.SetSelectedObject(newObject);
  }

  public CopyObject(entry: IBaseGameEntity) {
    const newObject = this.data[this.currentSelectedEntityType].service.Copy(entry);

    this.SetSelectedObject(newObject);
  }

  public DeleteObject(entry: IBaseGameEntity) {
    if (entry === this.GetSelectedObject()) {
      console.log('yap');
      this.SetSelectedObject(null);
    }

    this.data[this.currentSelectedEntityType].service.Delete(entry);
  }

  public FindObjectByID(objectID: number): IBaseGameEntity {
    for (const dataKey in this.data) {
      if (this.data[dataKey]) {
        if (this.data[dataKey].bSubject.value.find((obj: IBaseGameEntity) => obj.id === objectID)) {
          return this.data[dataKey].bSubject.value.find((obj: IBaseGameEntity) => obj.id === objectID);
        }
      }
    }
    return null;
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

  public LoadPackageByDialog(): boolean {
    const adventurePathName: {path: string, name: string} = this.adventuresManagerService.GetAdventureByDialog();

    if (adventurePathName === null) {
      return false;
    }

    this.LoadPackage(adventurePathName.path, adventurePathName.name);

    return true;
  }

  public LoadPackage(path: string, name: string) {
    this.libraryService.LoadPackage(path, name);

    this.GetDataFromLibrary();
    this.ResetEditor();
  }

  public SavePackage() {
    this.libraryService.SavePackage(this.Adventure.value[0].path, this.Adventure.value[0].Name);
  }

  private ResetEditor() {
    this.selectedObject.next(null);
    this.$currentSelectedEntityType = null;
    this.$currentSelectedRightState = RightSidebarStateEnum.none;
  }
}
