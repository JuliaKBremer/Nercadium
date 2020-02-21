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
import {NoteObject} from "../../../data/schema/Classes/Editor/Scene/SceneNote";
import {GameChapter} from "../../../data/schema/Classes/Editor/Chapter/GameChapter";
import {Script} from "vm";
import {GameCharacterTemplateTemplate} from "../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private Adventures: AdventureObject[];
  private Characters: CharacterObject[];
  private Objects: GameObject[];
  private Scenes: SceneObject[];
  private Scripts: GameScript[];
  private ObjectTemplates: GameObjectTemplate[];
  private CharacterTemplates: GameObjectTemplate[];
  Description: string;
  Name: string;


  constructor(private FileAccessService: StorageSystemService) {
    this.Objects = [];
    this.Adventures = [];
    this.Characters = [];
    this.Scenes = [];
    this.Scripts = [];
    this.ObjectTemplates = [];
    this.CharacterTemplates = [];
  }

  Clear() {

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

  public AddGameObject(gameObject: GameObject) {
    this.Objects.push(gameObject);
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

  public SaveGameObjectByIDPackage(FilePath: string, FileName: string, gameObjectID: number) {

  }

  public SaveGameObjectByNamePackage(FilePath: string, FileName: string, gameObjectID: number) {

  }

  public SaveGameObjectPackage(FilePath: string, FileName: string, gameObject: GameObject) {
  //  const itms: IBaseGameEntity[] = [];
  //  itms.push(gameObject);
  //  const handler = new PAFHandler(this.FileAccessService);
  //  const ppackage  = handler.CreatePackage(itms, '/Users/mdmm/', 'Package');
  //  handler.SavePAFile(ppackage);
  }
  // GameObject Methods ---   END   ---

  public LoadPackage(FilePath: string, FileName: string) {

  }

  public SavePackage(FilePath: string, FileName: string) {

    const handler = new PAFHandler(this.FileAccessService);
    const ppackage  = this.createPackage(FilePath, FileName);
    handler.SavePAFile(ppackage);
  }

  private saveObjectList(objects: IBaseGameEntity[], Path: string, PackageName: string) {
      for (const entry of objects) {
        const file = new StorageFile();
        let pathSubFolder: string;


        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Object) {
          pathSubFolder = 'Object/';
          file.fileData = entry as GameObject;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Character) {
          pathSubFolder = 'Character/';
          file.fileData = entry as CharacterObject;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.CharacterTemplate) {
          pathSubFolder = 'CharacterTemplate/';
          file.fileData = entry as GameCharacterTemplateTemplate;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.ObjectTemplate) {
          pathSubFolder = 'ObjectTemplate/';
          file.fileData = entry as GameObjectTemplate;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Script) {
          pathSubFolder = 'Script/';
          file.fileData = entry as GameScript;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Scene) {
          pathSubFolder = 'Scene/';
          file.fileData = entry as SceneObject;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Chapter) {
          pathSubFolder = 'Chapter/';
          file.fileData = entry as GameChapter;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.GetEntityType() == EntityTypeEnum.Note) {
          pathSubFolder = 'Note/';
          file.fileData = entry as NoteObject;
        }

        file.filePath = Path + pathSubFolder
        file.fileName = entry.Name + '.json';
        console.log('Saving under :' + file.filePath + file.fileName);
        this.FileAccessService.saveData(file);
      }
  }

  private createPackage(Path: string, PackageName: string) {

    console.log('asd');
    const pafile = new PAFile();
    pafile.fileName = PackageName;
    pafile.filePath = Path;
    const pafEntries: PAFEntry[] = [];

    for (const entry of this.Objects) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path + 'Objects/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    for (const entry of this.Adventures) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path + 'Adventures/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    for (const entry of this.Characters) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path  + 'Characters/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    for (const entry of this.Scenes) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path + 'Scenes/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    for (const entry of this.Scripts) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path + 'Scripts/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }


    for (const entry of this.CharacterTemplates) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path  + 'CharacterTemplates/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }


    for (const entry of this.ObjectTemplates) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path + 'ObjectTemplates/';
      newEnt.type = entry.GetEntityType();
      pafEntries.push(newEnt);
    }

    this.saveObjectList(this.Objects, Path, PackageName );

    pafile.Entries = pafEntries;
    return pafile;
  }

  public SavePackageByFilePath(FilePath: string) {

  }

}
