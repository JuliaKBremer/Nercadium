// tslint:disable-next-line:no-empty-interface
import {INote} from './INote';
import {IGameCharacter} from './IGameCharacter';
import {IGameObject} from './IGameObject';

export interface IGameScene {

  // ID der Szene
  id: number;

  // Name der Szene
  Name: string;

  // Beschreibung der Szene
  Description: string;

  // Notizen innerhalb der Szene
  Notes: INote[];

  // Charaktaere / NPCs innerhalb der Szene
  Characters: IGameCharacter[];

  // Objekte / Gegenstaende usw. in der Szene
  Objects: IGameObject [];
}
