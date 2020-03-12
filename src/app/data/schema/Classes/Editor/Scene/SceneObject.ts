import {IGameScene} from '../../../Interfaces/Editor/IGameScene';
import {INote} from '../../../Interfaces/Editor/INote';
import {IGameCharacter} from '../../../Interfaces/Editor/IGameCharacter';
import {IGameObject} from '../../../Interfaces/Editor/IGameObject';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';

export class SceneObject implements IGameScene, IBaseGameEntity {
  // ID der Szene
  id: number;

  // Entity's Tags
  public Tags: string[];

  // Name der Szene
  Name: string;

  // Beschreibung der Szene
  Description: string;

  // Notizen der Szene
  Notes: INote[];

  // Characters / NPCs in der Szene
  Characters: IGameCharacter[];

  // Objekte / Gegendstände in der Szene
  Objects: IGameObject[];

  GetEntityType(): EntityTypeEnum {
    return EntityTypeEnum.Scene;
  }


}
