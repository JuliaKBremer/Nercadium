import {IGameCharacter} from '../../../Interfaces/Editor/IGameCharacter';
import {IGameCharacterTemplate} from '../../../Interfaces/Editor/IGameCharacterTemplate';
import {IProperty} from '../../../Interfaces/Editor/IProperty';
import {IGameObject} from '../../../Interfaces/Editor/IGameObject';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';

export class CharacterObject implements IGameCharacter, IBaseGameEntity {

  // ID des Objektes.
  id: number;

  // Charakter/Heldenname.
  Name: string;

  // Beschreibung zu dem Charakter.
  Description: string;

  // Das zu ladene Template
  CharacterTemplate: IGameCharacterTemplate;

  // Zugewiesene Werte/Eigenschaften.
  Properties: IProperty[];

  // Items die dem Charakter zugewiesen sind.
  Items: IGameObject[];

  GetEntityType(): number {
    return EntityTypeEnum.Character;
  }

}
