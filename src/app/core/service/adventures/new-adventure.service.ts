import { Injectable } from '@angular/core';
import {AdventuresManagerService} from './adventures-manager.service';
import {AdventureObject} from '../../../data/schema/Classes/Editor/Adventure/AdventureObject';
import {LibraryService} from '../localLibrary/library.service';
import {EditorService} from '../../../modules/editor/services/editor/editor.service';
import * as Electron from 'electron';

// @ts-ignore
declare var electron: Electron;

interface NewAdventure {
  id: number;
  name: string;
  path: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class NewAdventureService {

  public newAdventure: NewAdventure = null;

  constructor(private adventuresManagerService: AdventuresManagerService,
              private libraryService: LibraryService,
              private editorService: EditorService) { }

  public NewAdventure() {
    this.newAdventure = {
      id: this.editorService.GetNewID(),
      name: 'New Adventure',
      // TODO: Get default path from settings
      path: '',
      description: 'Hier könnte ihre Werbung stehen.'
    };
  }

  public GetPathByDialog() {
     const path = electron.remote.dialog.showOpenDialogSync(
      {properties: ['openDirectory'], title: 'Chose Directory'});

     if (path === undefined) {
       return;
     }

     this.newAdventure.path = path[0];
  }

  public CreateAdventure() {
    const adventure: AdventureObject = new AdventureObject();

    adventure.id = this.newAdventure.id;
    adventure.Name = this.newAdventure.name;
    adventure.path = this.newAdventure.path;
    adventure.Description = this.newAdventure.description;

    this.libraryService.Clear();
    this.editorService.GetDataFromLibrary();
    this.libraryService.Add(adventure);
    this.libraryService.SavePackage(this.newAdventure.path, this.newAdventure.name);

    this.adventuresManagerService.AddAdventure(this.newAdventure.path, this.newAdventure.name);
  }
}
