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




  AdventuresPaths: string[];
  CharacterTemplatesPaths: string[];
  CharactersPaths: string[];
  Description: string;
  Name: string;
  ObjectsPaths: string[];
  ObjectsTemplatesPaths: string[];
  Path: string;
  ScenesPaths: string[];
  ScriptsPaths: string[];

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

  private savePackageObjects(Path: string, PackageName: string) {

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
      pafEntries.push(newEnt);
    }

    for (const entry of this.Adventures) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path + 'Adventures/';
      pafEntries.push(newEnt);
    }

    for (const entry of this.Characters) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path + 'Characters/';
      pafEntries.push(newEnt);
    }

    for (const entry of this.Scenes) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path + 'Scenes/';
      pafEntries.push(newEnt);
    }

    for (const entry of this.Scripts) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path + 'Scripts/';
      pafEntries.push(newEnt);
    }


    for (const entry of this.CharacterTemplates) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path + 'CharacterTemplates/';
      pafEntries.push(newEnt);
    }


    for (const entry of this.ObjectTemplates) {
      const newEnt = new PAFEntry();
      newEnt.fileName = entry.Name + '.json';
      newEnt.filePath = Path + 'ObjectTemplates/';
      pafEntries.push(newEnt);
    }

    pafile.Entries = pafEntries;
    return pafile;
  }



  public SavePackageByFilePath(FilePath: string) {

  }

}
