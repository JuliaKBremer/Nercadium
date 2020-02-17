import {IGameCharacterTemplate} from './IGameCharacterTemplate';
import {IGameObject} from './IGameObject';

export interface IGameCharacter {

  // ID des Charakter
  id: number;

  // Name
  Name: string;

  // Beschreibung
  Descripton: string;

  // Zugewiesenes Template
  CharacterTemplate: IGameCharacterTemplate;

  // Zugewiesene Items
  Items: IGameObject[];
}
