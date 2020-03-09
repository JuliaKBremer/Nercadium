import { Injectable } from '@angular/core';
import {AdventureObject} from '../../../data/schema/Classes/Editor/Adventure/AdventureObject';
import {CharacterObject} from '../../../data/schema/Classes/Editor/Character/CharacterObject';
import {GameObject} from '../../../data/schema/Classes/Editor/Objects/GameObject';
import {SceneObject} from '../../../data/schema/Classes/Editor/Scene/SceneObject';
import {GameScript} from '../../../data/schema/Classes/Editor/Scripts/GameScript';
import {StorageSystemService} from '../storageSystem/storage-system.service';
import {StorageFile} from '../../../data/schema/Classes/Storage/StorageFile';
import {GameObjectTemplate} from '../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {PAFile} from '../../../data/schema/Classes/Storage/PAFile';
import {PAFHandler} from '../../../data/schema/Classes/Storage/PAFHandler';
import {IBaseGameEntity} from '../../../data/schema/Interfaces/Editor/IBaseGameEntity';
import {PAFEntry} from '../../../data/schema/Classes/Storage/PAFEntry';
import {EntityTypeEnum} from '../../../data/schema/Classes/Storage/EntityTypeEnum';
import {NoteObject} from '../../../data/schema/Classes/Editor/Scene/SceneNote';
import {GameChapter} from '../../../data/schema/Classes/Editor/Chapter/GameChapter';
import {GameCharacterTemplateTemplate} from '../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private Adventures: AdventureObject[];
  private Characters: CharacterObject[];
  private Objects: GameObject[];
  private Scenes: SceneObject[];
  private Scripts: GameScript[];
  private Chapters: GameChapter[];
  private Notes: NoteObject[];
  private ObjectTemplates: GameObjectTemplate[];
  private CharacterTemplates: GameObjectTemplate[];
  Description: string;
  Name: string;


  constructor(private FileAccessService: StorageSystemService) {
    this.Objects = [];
    this.Adventures = [];
    this.Characters = [];
    this.Notes = [];
    this.Scenes = [];
    this.Scripts = [];
    this.Chapters = [];
    this.ObjectTemplates = [];
    this.CharacterTemplates = [];
  }

  Clear(): void {
    this.Objects = [];
    this.Adventures = [];
    this.Characters = [];
    this.Notes = [];
    this.Scenes = [];
    this.Scripts = [];
    this.Chapters = [];
    this.ObjectTemplates = [];
    this.CharacterTemplates = [];
  }

  public Add(gameObject: IBaseGameEntity) {

    if (gameObject.GetEntityType() === EntityTypeEnum.Object) {
      this.Objects.push(gameObject as GameObject);
    }

    if (gameObject.GetEntityType() === EntityTypeEnum.Adventure) {
      this.Adventures.push(gameObject as AdventureObject);
    }

    if (gameObject.GetEntityType() === EntityTypeEnum.Character) {
      this.Characters.push(gameObject as CharacterObject);
    }

    if (gameObject.GetEntityType() === EntityTypeEnum.CharacterTemplate) {
      this.CharacterTemplates.push(gameObject as GameCharacterTemplateTemplate);
    }

    if (gameObject.GetEntityType() === EntityTypeEnum.ObjectTemplate) {
      this.ObjectTemplates.push(gameObject as GameObjectTemplate);
    }

    if (gameObject.GetEntityType() === EntityTypeEnum.Script) {
      this.Scripts.push(gameObject as GameScript);
    }

    if (gameObject.GetEntityType() === EntityTypeEnum.Scene) {
      this.Scenes.push(gameObject as SceneObject);
    }

    if (gameObject.GetEntityType() === EntityTypeEnum.Chapter) {
      this.Chapters.push(gameObject as GameChapter);
    }

    if (gameObject.GetEntityType() === EntityTypeEnum.Note) {
      this.Notes.push(gameObject as NoteObject);
    }


  }

  // GameObject Methods ---   START   ---
  public UpdateGameObjectByID(gameObjectID: number, newGameObject: GameObject) {
    return;
  }

  public RemoveGameObjectCollection(gameObject: GameObject[]) {
    return;
  }

  public RemoveGameObjectByID(gameObjectID: number) {
    return;
  }

  public RemoveGameObject(gameObject: GameObject) {
    return;
  }

  public AddGameObjectCollection(gameObject: GameObject[]) {
    return;
  }

  public GetGameObjectByID(ObjectID: number): GameObject {
    return null;
  }

  public GetGameObjectByName(ObjectName: string): GameObject {
    return null;
  }

  public GetGameObjectsByName(ObjectName: string): GameObject[] {
    return null;
  }

  public GetGameObjectsByDescription(ObjectName: string): GameObject[] {
    return null;
  }

  public LoadPackage(FilePath: string, FileName: string) {

  }

  public SavePackage(FilePath: string, PackageName: string) {

    const handler = new PAFHandler(this.FileAccessService);
    const ppackage  = this.createPackage(FilePath, PackageName);
    handler.SavePAFile(ppackage);
    this.saveObjectList(this.Objects, FilePath, PackageName);
    this.saveObjectList(this.Chapters, FilePath, PackageName);
    this.saveObjectList(this.Notes, FilePath, PackageName);
    this.saveObjectList(this.Adventures, FilePath, PackageName);
    this.saveObjectList(this.Characters, FilePath, PackageName);
    this.saveObjectList(this.CharacterTemplates, FilePath, PackageName);
    this.saveObjectList(this.ObjectTemplates, FilePath, PackageName);
    this.saveObjectList(this.Scripts, FilePath, PackageName);
    this.saveObjectList(this.Scenes, FilePath, PackageName);
  }

  private saveObjectList(objects: IBaseGameEntity[], Path: string, PackageName: string) {
      for (const entry of objects) {
        const file = new StorageFile();
        let pathSubFolder: string;

        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Object) {
          pathSubFolder = '/' + PackageName + '/Objects/';
          file.fileData = entry as GameObject;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Adventure) {
          pathSubFolder = '/' + PackageName +  '/Adventures/';
          file.fileData = entry as AdventureObject;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Character) {
          pathSubFolder = '/' + PackageName +  '/Characters/';
          file.fileData = entry as CharacterObject;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.CharacterTemplate) {
          pathSubFolder = '/' + PackageName +  '/CharacterTemplates/';
          file.fileData = entry as GameCharacterTemplateTemplate;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.ObjectTemplate) {
          pathSubFolder = '/' + PackageName +  '/ObjectTemplates/';
          file.fileData = entry as GameObjectTemplate;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Script) {
          pathSubFolder = '/' + PackageName +  '/Scripts/';
          file.fileData = entry as GameScript;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Scene) {
          pathSubFolder = '/' + PackageName +  '/Scenes/';
          file.fileData = entry as SceneObject;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Chapter) {
          pathSubFolder = '/' + PackageName +  '/Chapters/';
          file.fileData = entry as GameChapter;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Note) {
          pathSubFolder = '/' + PackageName +  '/Notes/';
          file.fileData = entry as NoteObject;
        }

        file.filePath = Path + pathSubFolder;
        file.fileName = this.getNoSpecialString(entry.Name) + '.json';
        console.log('Saving under :' + file.filePath + file.fileName);
        this.FileAccessService.saveData(file);
      }
  }

  private createPackage(Path: string, PackageName: string, Description?: string) {

    console.log('asd');
    const pafile = new PAFile();
    pafile.Name = PackageName;
    if (this.Description != null) {
      pafile.Description = this.Description;
    }
    pafile.fileName = 'main.paf';
    pafile.filePath = Path + '/' + PackageName;
    const pafEntries: PAFEntry[] = [];

    for (const entry of this.Notes) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName + '/Notes/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    for (const entry of this.Objects) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName +  '/Objects/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    for (const entry of this.Adventures) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName +  '/Adventures/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    for (const entry of this.Characters) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path  + '/' + PackageName +  '/Characters/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    for (const entry of this.Scenes) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName +  '/Scenes/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    for (const entry of this.Scripts) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName +  '/Scripts/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    for (const entry of this.Chapters) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName +  '/Chapters/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    for (const entry of this.CharacterTemplates) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path  + '/' + PackageName +  '/CharacterTemplates/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    for (const entry of this.ObjectTemplates) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName +  '/ObjectTemplates/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    this.saveObjectList(this.Objects, Path, PackageName );

    pafile.Entries = pafEntries;
    return pafile;
  }

  private getNoSpecialString(value: string) {
    const val = value.replace(/[^a-zA-Z ]/g, '');
    return val.split(' ').join('_');
  }

  public SavePackageByFilePath(FilePath: string) {

  }

}
