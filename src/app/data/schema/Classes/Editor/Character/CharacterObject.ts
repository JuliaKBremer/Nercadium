import {IGameCharacter} from '../../../Interfaces/Editor/IGameCharacter';
import {IGameCharacterTemplate} from '../../../Interfaces/Editor/IGameCharacterTemplate';
import {IProperty} from '../../../Interfaces/Editor/IProperty';
import {IGameObject} from '../../../Interfaces/Editor/IGameObject';

export class CharacterObject implements IGameCharacter {

  // ID des Objektes.
  id: number;

  // Charakter/Heldenname.
  Name: string;

  // Beschreibung zu dem Charakter.
  Descripton: string;

  // Das zu ladene Template
  CharacterTemplate: IGameCharacterTemplate;

  // Zugewiesene Werte/Eigenschaften.
  Properties: IProperty[];

  // Items die dem Charakter zugewiesen sind.
  Items: IGameObject[];

}
