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

  // Privates..
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

  // Aktueller Status der Library z.B. Laden usw.
  public State: StateEnum;

  constructor(private FileAccessService: StorageSystemService) {
    this.Clear();
  }

  // doppelt.. besser nicht rausnehmen für den Fall, dass
  // jemand die Methode verwendet ( weil früher geaddet ).
  public GetLoadedObjects() {
    return this.Objects;
  }

  // Getter der jeweiligen Objekte. Bewusst nur Getter, aus Zugriffsgründen.

  // Gibt alle im Cache befindlichen Abenteuer als Array zurück.
  public GetAdventures() { return this.Adventures; }

  // Gibt alle im Cache befindlichen Charaktere als Array zurück.
  public GetCharacters() { return this.Characters; }

  // Gibt alle im Cache befindlichen Objekte als Array zurück.
  public GetObjects() { return this.Objects; }

  // Gibt alle im Cache befindlichen Szenen als Array zurück.
  public GetScenes() { return this.Scenes; }

  // Gibt alle im Cache befindlichen Skripte als Array zurück.
  public GetScripts() { return this.Scripts; }

  // Gibt alle im Cache befindlichen Kapitel als Array zurück.
  public GetChapters() { return this.Chapters; }

  // Gibt alle im Cache befindlichen Notes als Array zurück.
  public GetNotes() { return this.Notes; }

  // Gibt alle im Cache befindlichen Objekt-Templates als Array zurück.
  public GetObjectTemplates() { return this.ObjectTemplates; }

  // Gibt alle im Cache befindlichen Charakter-Templates als Array zurück.
  public GetCharacterTemplates() { return this.CharacterTemplates; }



  // Leert die Einträge / setzt die Datenbank zurück.
  public Clear(): void {
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

  // General Methods

  // Void.
  // Fügt eine neue IBaseGameEntity der Datenbank hinzu.
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

  // Defaultwert : FALSE
  // Entfernt das angegebene IBaseGameEnitity aus der Datenbank.
  public Remove(gameObject: IBaseGameEntity): boolean {
  let removed = false;

  if (gameObject != null) {

      if (gameObject.EntityType === EntityTypeEnum.Object) {
        // tslint:disable-next-line:no-shadowed-variable
        const index  = this.Objects.findIndex( (object) => object === gameObject);
        console.log('Index found:' + index);
        if (index > -1) {
          this.Objects.splice(index, 1);
          removed = true;
        }
      }

      if (gameObject.EntityType === EntityTypeEnum.Adventure) {
        const index  = this.Adventures.findIndex( (object) => object === gameObject);
        console.log('Index found:' + index);
        if (index > -1) {
          this.Adventures.splice(index, 1);
          removed = true;
        }
      }

      if (gameObject.EntityType === EntityTypeEnum.Character) {
        const index  = this.Characters.findIndex( (object) => object === gameObject);
        console.log('Index found:' + index);
        if (index > -1) {
          this.Characters.splice(index, 1);
          removed = true;
        }
      }

      if (gameObject.EntityType === EntityTypeEnum.CharacterTemplate) {
        const index  = this.CharacterTemplates.findIndex( (object) => object === gameObject);
        console.log('Index found:' + index);
        if (index > -1) {
          this.CharacterTemplates.splice(index, 1);
          removed = true;
        }
      }

      if (gameObject.EntityType === EntityTypeEnum.ObjectTemplate) {
        const index  = this.ObjectTemplates.findIndex( (object) => object === gameObject);
        console.log('Index found:' + index);
        if (index > -1) {
          this.ObjectTemplates.splice(index, 1);
          removed = true;
        }
      }

      if (gameObject.EntityType === EntityTypeEnum.Script) {
        const index  = this.Scripts.findIndex( (object) => object === gameObject);
        console.log('Index found:' + index);
        if (index > -1) {
          this.Scripts.splice(index, 1);
          removed = true;
        }
        // this.Scripts.push(gameObject as GameScript);
      }

      if (gameObject.EntityType === EntityTypeEnum.Scene) {
        const index  = this.Scenes.findIndex( (object) => object === gameObject);
        console.log('Index found:' + index);
        if (index > -1) {
          this.Scenes.splice(index, 1);
          removed = true;
        }
      }

      if (gameObject.EntityType === EntityTypeEnum.Chapter) {
        const index  = this.Chapters.findIndex( (object) => object === gameObject);
        console.log('Index found:' + index);
        if (index > -1) {
          this.Chapters.splice(index, 1);
          removed = true;
        }
      }

      if (gameObject.EntityType === EntityTypeEnum.Note) {
        const index  = this.Notes.findIndex( (object) => object === gameObject);
        console.log('Index found:' + index);
        if (index > -1) {
          this.Notes.splice(index, 1);
          removed = true;
        }
      }
    }

  return removed;
  }

  // Defaultwert : FALSE
  // Ersetzt das IBaseGameEntity anhand der angegebenen ID.
  public Replace(id: number, newGameObjectValue: IBaseGameEntity): boolean {
    let replaced = false;

    if (newGameObjectValue != null) {

      if (newGameObjectValue.EntityType === EntityTypeEnum.Object) {
        const prevObj = this.Objects[id];
        if (prevObj != null) {
          console.log('Object found on Index:' + id);
          this.Objects[id] = newGameObjectValue as GameObject;
          replaced = true;
        }
      }

      if (newGameObjectValue.EntityType === EntityTypeEnum.Adventure) {
        const prevObj = this.Adventures[id];
        if (prevObj != null) {
          console.log('Object found on Index:' + id);
          this.Adventures[id] = newGameObjectValue as AdventureObject;
          replaced = true;
        }
      }

      if (newGameObjectValue.EntityType === EntityTypeEnum.Character) {
        const prevObj = this.Characters[id];
        if (prevObj != null) {
          console.log('Object found on Index:' + id);
          this.Characters[id] = newGameObjectValue as CharacterObject;
          replaced = true;
        }
      }

      if (newGameObjectValue.EntityType === EntityTypeEnum.CharacterTemplate) {
        const prevObj = this.CharacterTemplates[id];
        if (prevObj != null) {
          console.log('Object found on Index:' + id);
          this.CharacterTemplates[id] = newGameObjectValue as GameCharacterTemplate;
          replaced = true;
        }
      }

      if (newGameObjectValue.EntityType === EntityTypeEnum.ObjectTemplate) {
        const prevObj = this.ObjectTemplates[id];
        if (prevObj != null) {
          console.log('Object found on Index:' + id);
          this.ObjectTemplates[id] = newGameObjectValue as GameObjectTemplate;
          replaced = true;
        }
      }

      if (newGameObjectValue.EntityType === EntityTypeEnum.Script) {
        const prevObj = this.Scripts[id];
        if (prevObj != null) {
          console.log('Object found on Index:' + id);
          this.Scripts[id] = newGameObjectValue as GameScript;
          replaced = true;
        }
      }

      if (newGameObjectValue.EntityType === EntityTypeEnum.Scene) {
        const prevObj = this.Scenes[id];
        if (prevObj != null) {
          console.log('Object found on Index:' + id);
          this.Scenes[id] = newGameObjectValue as SceneObject;
          replaced = true;
        }
      }

      if (newGameObjectValue.EntityType === EntityTypeEnum.Chapter) {
        const prevObj = this.Chapters[id];
        if (prevObj != null) {
          console.log('Object found on Index:' + id);
          this.Chapters[id] = newGameObjectValue as GameChapter;
          replaced = true;
        }
      }

      if (newGameObjectValue.EntityType === EntityTypeEnum.Note) {
        const prevObj = this.Notes[id];
        if (prevObj != null) {
          console.log('Object found on Index:' + id);
          this.Notes[id] = newGameObjectValue as NoteObject;
          replaced = true;
        }
      }
    }

    return replaced;
  }

  // Defaultwert : NULL
  // Gibt anhand des angegebenen EntityTypeEnum und Index das gesuchte Object zurück.
  public GetEntityByIndex(index: number, type: EntityTypeEnum ) {
    let found = null;

    if (index > -1) {
      if (type === EntityTypeEnum.Object && index <= this.Objects.length) {
        // tslint:disable-next-line:no-shadowed-variable
        found = this.Objects[index];
        console.log('Item found:' + found);
      }
    }
    if (index > -1) {
      if (type === EntityTypeEnum.Note && index <= this.Notes.length) {
        // tslint:disable-next-line:no-shadowed-variable
        found = this.Notes[index];
        console.log('Item found:' + found);
      }
    }
    if (index > -1) {
      if (type === EntityTypeEnum.Adventure && index <= this.Adventures.length) {
        // tslint:disable-next-line:no-shadowed-variable
        found = this.Adventures[index];
        console.log('Item found:' + found);
      }
    }
    if (index > -1) {
      if (type === EntityTypeEnum.Chapter && index <= this.Chapters.length) {
        // tslint:disable-next-line:no-shadowed-variable
        found = this.Chapters[index];
        console.log('Item found:' + found);
      }
    }
    if (index > -1) {
      if (type === EntityTypeEnum.Character && index <= this.Characters.length) {
        // tslint:disable-next-line:no-shadowed-variable
        found = this.Characters[index];
        console.log('Item found:' + found);
      }
    }
    if (index > -1) {
      if (type === EntityTypeEnum.CharacterTemplate && index <= this.CharacterTemplates.length) {
        // tslint:disable-next-line:no-shadowed-variable
        found = this.CharacterTemplates[index];
        console.log('Item found:' + found);
      }
    }
    if (index > -1) {
      if (type === EntityTypeEnum.ObjectTemplate && index <= this.ObjectTemplates.length) {
        // tslint:disable-next-line:no-shadowed-variable
        found = this.ObjectTemplates[index];
        console.log('Item found:' + found);
      }
    }
    if (index > -1) {
      if (type === EntityTypeEnum.Script && index <= this.Scripts.length) {
        // tslint:disable-next-line:no-shadowed-variable
        found = this.Scripts[index];
        console.log('Item found:' + found);
      }
    }
    if (index > -1) {
      if (type === EntityTypeEnum.Scene && index <= this.Scenes.length) {
        // tslint:disable-next-line:no-shadowed-variable
        found = this.Scenes[index];
        console.log('Item found:' + found);
      }
    }
    return found;
  }

  // Defaultwert : NULL
  // Gibt anhand des angegebenen EntityTypeEnum und Namen den gesuchten Index zurück.
  public FindIndexByName(name: string, type: EntityTypeEnum ) {
    let found = -1;

    if (name != null) {

      if (type === EntityTypeEnum.Object) {
        // tslint:disable-next-line:no-shadowed-variable
        const indexx = this.Objects.find(item => item.Name === name);
        found = this.Objects.findIndex((object) => object === indexx);
        console.log('Index found:' + found);
      }
      if (type === EntityTypeEnum.Chapter) {
        // tslint:disable-next-line:no-shadowed-variable
        const indexx = this.Chapters.find(item => item.Name === name);
        found = this.Chapters.findIndex((object) => object === indexx);
        console.log('Index found:' + found);
      }
      if (type === EntityTypeEnum.Scene) {
        // tslint:disable-next-line:no-shadowed-variable
        const indexx = this.Scenes.find(item => item.Name === name);
        found = this.Scenes.findIndex((object) => object === indexx);
        console.log('Index found:' + found);
      }
      if (type === EntityTypeEnum.Script) {
        // tslint:disable-next-line:no-shadowed-variable
        const indexx = this.Scripts.find(item => item.Name === name);
        found = this.Scripts.findIndex((object) => object === indexx);
        console.log('Index found:' + found);
      }
      if (type === EntityTypeEnum.ObjectTemplate) {
        // tslint:disable-next-line:no-shadowed-variable
        const indexx = this.ObjectTemplates.find(item => item.Name === name);
        found = this.ObjectTemplates.findIndex((object) => object === indexx);
        console.log('Index found:' + found);
      }
      if (type === EntityTypeEnum.CharacterTemplate) {
        // tslint:disable-next-line:no-shadowed-variable
        const indexx = this.CharacterTemplates.find(item => item.Name === name);
        found = this.CharacterTemplates.findIndex((object) => object === indexx);
        console.log('Index found:' + found);
      }
      if (type === EntityTypeEnum.Character) {
        // tslint:disable-next-line:no-shadowed-variable
        const indexx = this.Characters.find(item => item.Name === name);
        found = this.Characters.findIndex((object) => object === indexx);
        console.log('Index found:' + found);
      }
      if (type === EntityTypeEnum.Adventure) {
        // tslint:disable-next-line:no-shadowed-variable
        const indexx = this.Adventures.find(item => item.Name === name);
        found = this.Adventures.findIndex((object) => object === indexx);
        console.log('Index found:' + found);
      }
      if (type === EntityTypeEnum.Note) {
        // tslint:disable-next-line:no-shadowed-variable
        const indexx = this.Notes.find(item => item.Name === name);
        found = this.Notes.findIndex((object) => object === indexx);
        console.log('Index found:' + found);
      }

    }
    return found;
  }

  // Lädt aus dem angegebenen Ordner den angegebenen Paketnamen.
  // Die geladenen Objekte sind anschließend in der Library verfügbar.
  public LoadPackage(FilePath: string, packageName: string) {
    this.State = StateEnum.Loading;
    const handler = new PAFHandler(this.FileAccessService);
    const result = handler.LoadPAFFile(FilePath, packageName);

    if (result != null) {
      console.log('PAF not null! Loaded!');
      // Leeren der im cache befindlichen Objekte, damit diese mit dem Paket ersetzt werden.
      this.Clear();
      result.then( (entries) => {
        // Aus den Einträgen in der PAF Datei die Dateipfade generieren und die jeweiligen Objekte
        // einzeln laden.
        for (const entry of entries) {
          const newFile = new StorageFile();
          newFile.filePath = FilePath  + entry.filePath;
          console.log('Loading Attempt for:' + newFile.filePath);
          newFile.fileName = entry.fileName;
          console.log('Loading Attempt for:' + newFile.fileName);
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

      // Sehr Dirty.. allerdings, allerdings klappt es um so den Status korrekt zu setzten..
      while (this.State === StateEnum.Loading) {
      }

      if (this.State !== StateEnum.Loading) {
        return this.State;
      }
    }
    return this.State;
  }

  // Typed das ungetypte IBaseGameEntity anhand des typedstr (TypeString)
  private getTypedEntity(obj: object, typedstr: string): IBaseGameEntity {
    let retVal = null as IBaseGameEntity;
    console.log('got: ' + typedstr);
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Object) {
      retVal = Object.assign(new GameObject(), obj);
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Adventure) {
      retVal = Object.assign(new AdventureObject(), obj);
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Character) {
      retVal = Object.assign(new CharacterObject(), obj);
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.CharacterTemplate) {
      retVal = Object.assign(new GameCharacterTemplate(), obj);
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.ObjectTemplate) {
      retVal = Object.assign(new GameObjectTemplate(), obj);
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Script) {
      retVal = Object.assign(new GameScript(), obj);
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Scene) {
      retVal = Object.assign(new SceneObject(), obj);
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Chapter) {
      retVal = Object.assign(new GameChapter(), obj);
    }
    // tslint:disable-next-line:triple-equals
    if (typedstr == EntityTypeEnum.Note) {
      retVal = Object.assign(new NoteObject(), obj);
    }
    return retVal;
  }

  // Erstellt ein PAF-Paket (PAF - Package Allocation File), welches als Hauptindex die "Main.paf"-Datei verwendet
  // in der alle verweise auf andere Objekte enthalten sind.
  // Die SavePackage Methode nimmt num alle (aktuell) in der Datenbank enthaltenden Objekte, Kapitel usw.
  // und erstellt unter dem angegebenen eine PAF Datei und die dazugehörigen Unterordner, in die dann die jeweiligen Objekte
  // als .json Datei gespeichert wird.
  public SavePackage(FilePath: string, PackageName: string) {

    const handler = new PAFHandler(this.FileAccessService);
    const ppackage  = this.createPackage(FilePath, PackageName);
    handler.SavePAFile(ppackage, FilePath + '/' + PackageName );
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

  // Speichert alle angegebenen IBaseGameEntity abhängig von dem angegebenen Pfad (Path)
  // und ihrem EntityType in einen jeweiligen Unterort ab.
  // Beispiel Pfad:/Users/sample/ , EntityType: Object  und PackageName: Test
  // würde unter '/Users/sample/Test/Object/$Object_Name.json' gespeichert werden.
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

  // Erstellt eine PAF-Datei mit jeweiligen Einträgen von allen aktuellen in der Datenbank befindlichen Objekten
  private createPackage(Path: string, PackageName: string, Description?: string) {

    console.log('asd');
    const pafile = new PAFile();
    pafile.Name = PackageName;
    if (this.Description != null) {
      pafile.Description = this.Description;
    }
    pafile.fileName = 'main.paf';
    pafile.filePath =  '/' + PackageName;
    const pafEntries: PAFEntry[] = [];

    for (const entry of this.Notes) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath =  '/' + PackageName + '/Notes/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.Objects) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath =  '/' + PackageName + '/Objects/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.Adventures) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath =  '/' + PackageName + '/Adventures/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.Characters) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath =  '/' + PackageName + '/Characters/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.Scenes) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath =  '/' + PackageName + '/Scenes/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.Scripts) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath =  '/' + PackageName +  '/Scripts/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.Chapters) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath =  '/' + PackageName + '/Chapters/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.CharacterTemplates) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath = '/' + PackageName + '/CharacterTemplates/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    for (const entry of this.ObjectTemplates) {
      const newEnt = new PAFEntry();
      newEnt.fileName = this.getNoSpecialString(entry.Name) + '.json';
      newEnt.filePath =  '/' + PackageName + '/ObjectTemplates/';
      newEnt.type = entry.EntityType;
      pafEntries.push(newEnt);
    }

    this.saveObjectList(this.Objects, Path, PackageName );

    pafile.Entries = pafEntries;
    return pafile;
  }

  // Entfernt alle Specialzeichen um Dateinamen entsprechend laden und speichern zu können.
  private getNoSpecialString(value: string) {
    const val = value.replace(/[^a-zA-Z0-9 ]/g, '');
    return val.split(' ').join('_');
  }

}
