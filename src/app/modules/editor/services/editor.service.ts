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

  constructor(private libraryService: LibraryService) {
    this.Adventure = new BehaviorSubject<AdventureObject>(null);
    this.Characters = new BehaviorSubject<CharacterObject[]>([]);
    this.Objects = new BehaviorSubject<GameObject[]>([]);
    this.Scenes = new BehaviorSubject<SceneObject[]>([]);
    this.Scripts = new BehaviorSubject<GameScript[]>([]);
    this.Chapters = new BehaviorSubject<GameChapter[]>([]);
    this.Notes = new BehaviorSubject<NoteObject[]>([]);
    this.ObjectTemplates = new BehaviorSubject<GameObjectTemplate[]>([]);
    this.CharacterTemplates = new BehaviorSubject<GameCharacterTemplate[]>([]);
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
