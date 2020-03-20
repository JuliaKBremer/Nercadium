import {Injectable} from '@angular/core';
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
import {GameCharacterTemplate} from '../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {StateEnum} from '../../../data/schema/Classes/Storage/StateEnum';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  Adventures: AdventureObject[];
  Characters: CharacterObject[];
  Objects: GameObject[];
  Scenes: SceneObject[];
  Scripts: GameScript[];
  Chapters: GameChapter[];
  Notes: NoteObject[];
  ObjectTemplates: GameObjectTemplate[];
  CharacterTemplates: GameObjectTemplate[];
  Description: string;
  Name: string;
  public State: StateEnum;


  constructor(private FileAccessService: StorageSystemService) {
    this.Clear();
  }

  Clear(): void {
    this.State = StateEnum.Default;
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

    if (gameObject.EntityType === EntityTypeEnum.Object) {
      this.Objects.push(gameObject as GameObject);
    }

    if (gameObject.EntityType === EntityTypeEnum.Adventure) {
      this.Adventures.push(gameObject as AdventureObject);
    }

    if (gameObject.EntityType === EntityTypeEnum.Character) {
      this.Characters.push(gameObject as CharacterObject);
    }

    if (gameObject.EntityType === EntityTypeEnum.CharacterTemplate) {
      this.CharacterTemplates.push(gameObject as GameCharacterTemplate);
    }

    if (gameObject.EntityType === EntityTypeEnum.ObjectTemplate) {
      this.ObjectTemplates.push(gameObject as GameObjectTemplate);
    }

    if (gameObject.EntityType === EntityTypeEnum.Script) {
      this.Scripts.push(gameObject as GameScript);
    }

    if (gameObject.EntityType === EntityTypeEnum.Scene) {
      this.Scenes.push(gameObject as SceneObject);
    }

    if (gameObject.EntityType === EntityTypeEnum.Chapter) {
      this.Chapters.push(gameObject as GameChapter);
    }

    if (gameObject.EntityType === EntityTypeEnum.Note) {
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
    this.State = StateEnum.Loading;
    const handler = new PAFHandler(this.FileAccessService);
    const result = handler.LoadPAFFile(FilePath, FileName);
    if (result != null) {
      this.Clear();
      result.then( (entries) => {
        for (const entry of entries) {
          const newFile = new StorageFile();
          newFile.filePath = entry.filePath;
          console.log(newFile.filePath);
          newFile.fileName = entry.fileName;
          console.log(newFile.fileName);
          this.FileAccessService.loadData(newFile).then( (objectRes => {
              if (objectRes != null) {
                console.log('typing... ');
                const typed = this.getTypedEntity(objectRes, entry.type);
                console.log('typed as : ' + typed.EntityType);
                this.Add(typed);
                console.log('Added: ' + typed.Name);
              }
          }))
            .catch( () => { this.State = StateEnum.Failure; });
        }
        this.State = StateEnum.Completed;
      } ) .catch( () => { this.State = StateEnum.Failure; })
        .finally( () => { const state = this.State; return state; } );

      while (this.State === StateEnum.Loading) {
      }

      if (this.State !== StateEnum.Loading) {
        return this.State;
      }
    }
    return this.State;
  }

  private getTypedEntity(obj: object, typedstr: string): IBaseGameEntity {
    let retVal = null as IBaseGameEntity;
    console.log('got: ' + typedstr);
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Object) {
      retVal = obj as GameObject;
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Adventure) {
      retVal = obj as  AdventureObject;
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Character) {
      retVal = obj as  CharacterObject;
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.CharacterTemplate) {
      retVal = obj as  GameCharacterTemplate;
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.ObjectTemplate) {
      retVal = obj as  GameObjectTemplate;
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Script) {
      retVal = obj as  GameScript;
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Scene) {
      retVal = obj as  SceneObject;
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Chapter) {
      retVal = obj as  GameChapter;
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Note) {
      retVal = obj as  NoteObject;
    }
    return retVal;
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
        if (entry.EntityType == EntityTypeEnum.Object) {
          pathSubFolder = '/' + PackageName + '/Objects/';
          file.fileData = entry as GameObject;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.EntityType == EntityTypeEnum.Adventure) {
          pathSubFolder = '/' + PackageName +  '/Adventures/';
          file.fileData = entry as AdventureObject;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.EntityType == EntityTypeEnum.Character) {
          pathSubFolder = '/' + PackageName +  '/Characters/';
          file.fileData = entry as CharacterObject;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.EntityType == EntityTypeEnum.CharacterTemplate) {
          pathSubFolder = '/' + PackageName +  '/CharacterTemplates/';
          file.fileData = entry as GameCharacterTemplate;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.EntityType == EntityTypeEnum.ObjectTemplate) {
          pathSubFolder = '/' + PackageName +  '/ObjectTemplates/';
          file.fileData = entry as GameObjectTemplate;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.EntityType == EntityTypeEnum.Script) {
          pathSubFolder = '/' + PackageName +  '/Scripts/';
          file.fileData = entry as GameScript;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.EntityType == EntityTypeEnum.Scene) {
          pathSubFolder = '/' + PackageName +  '/Scenes/';
          file.fileData = entry as SceneObject;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.EntityType == EntityTypeEnum.Chapter) {
          pathSubFolder = '/' + PackageName +  '/Chapters/';
          file.fileData = entry as GameChapter;
        }
        // tslint:disable-next-line:triple-equals
        if (entry.EntityType == EntityTypeEnum.Note) {
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
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.Objects) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName +  '/Objects/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.Adventures) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName +  '/Adventures/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.Characters) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path  + '/' + PackageName +  '/Characters/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.Scenes) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName +  '/Scenes/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.Scripts) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName +  '/Scripts/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.Chapters) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName +  '/Chapters/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.CharacterTemplates) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path  + '/' + PackageName +  '/CharacterTemplates/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.ObjectTemplates) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = Path + '/' + PackageName +  '/ObjectTemplates/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    this.saveObjectList(this.Objects, Path, PackageName );

    pafile.Entries = pafEntries;
    return pafile;
  }

  private getNoSpecialString(value: string) {
    const val = value.replace(/[^a-zA-Z0-9 ]/g, '');
    return val.split(' ').join('_');
  }

  public SavePackageByFilePath(FilePath: string) {

  }

}
