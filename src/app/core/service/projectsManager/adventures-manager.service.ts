import {Injectable} from '@angular/core';
import * as Electron from 'electron';
import {StorageSystemService} from '../storageSystem/storage-system.service';
import {ConfigManagerService} from '../configManager/config-manager.service';
import {IConfigLoad} from '../../../data/schema/Interfaces/Config/IConfigLoad';
import {IConfigSave} from '../../../data/schema/Interfaces/Config/IConfigSave';
import {BehaviorSubject} from 'rxjs';

// @ts-ignore
declare var electron: Electron;

interface IAdventuresConfig {
  adventures: {[id: string]: { path: string, name: string }};
  lastFiveAdventures: [];
}

@Injectable({
  providedIn: 'root'
})
export class AdventuresManagerService {

  private configFileName = 'adventuresConfig.json';

  private adventuresConfig: BehaviorSubject<IAdventuresConfig>;

  constructor(private storageSystemService: StorageSystemService, private configManagerService: ConfigManagerService) {
    this.adventuresConfig = new BehaviorSubject<IAdventuresConfig>(null);

    this.LoadAdventuresConfig();
  }

  private LoadAdventuresConfig() {
    const adventuresConfigDefault: IAdventuresConfig = {adventures: {}, lastFiveAdventures: []};
    const loadConfigData: IConfigLoad = {fileName: this.configFileName, defaultData: adventuresConfigDefault};

    this.configManagerService.loadConfig(loadConfigData).then(result => this.adventuresConfig.next(result));
  }

  private SaveAdventuresConfig() {
    const saveConfigData: IConfigSave = {fileName: this.configFileName, fileData: this.adventuresConfig.value};

    this.configManagerService.saveConfig(saveConfigData);
  }

  public AddAdventure(AdventurePath: string, AdventureName: string): string {
    const adventures = this.adventuresConfig.value.adventures;
    const adventuresCount = Object.keys(adventures).length.toString();

    adventures[adventuresCount] = {path: AdventurePath, name: AdventureName};

    this.SaveAdventuresConfig();

    return adventuresCount;
  }

  public GetAdventureByDialog(): { path: string, name: string } {
    const fullPath = electron.remote.dialog.showOpenDialogSync(
      {properties: ['openDirectory'], title: 'Load Project', filters: [{name: 'Paf', extensions: ['paf']}]})[0];

    const splittedPath = fullPath.split('\\');

    let path = '';
    for (let i = 0; i < splittedPath.length - 1; i++) {
      path = path + splittedPath[i] + '\\';
    }

    const name = splittedPath[splittedPath.length - 1];

    let adventureId: string = this.CheckIfAdventureListed(path, name);
    if (adventureId === null) {
      adventureId = this.AddAdventure(path, name);
    }

    return this.GetAdventureByID(adventureId);
  }

  public GetAdventureByID(id: string): { path: string, name: string } {
    if (this.adventuresConfig.value.adventures[id]) {
      return this.adventuresConfig.value.adventures[id];
    } else {
      return null;
    }
  }

  private CheckIfAdventureListed(path: string, name: string): string {
    const adventures = this.adventuresConfig.value.adventures;

    for (const adventureID in Object.keys(adventures)) {
      if (adventures[adventureID].path === path && adventures[adventureID].name === name) {
        return adventureID;
      }
    }

    return null;
  }
}
