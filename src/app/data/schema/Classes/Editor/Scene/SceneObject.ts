import {IGameScene} from '../../../Interfaces/Editor/IGameScene';
import {INote} from '../../../Interfaces/Editor/INote';
import {IGameCharacter} from '../../../Interfaces/Editor/IGameCharacter';
import {IGameObject} from '../../../Interfaces/Editor/IGameObject';

export class SceneObject implements IGameScene {
  // ID der Szene
  id: number;

  // Name der Szene
  Name: string;

  // Beschreibung der Szene
  Descripton: string;

  // Notizen der Szene
  Notes: INote[];

  // Characters / NPCs in der Szene
  Characters: IGameCharacter[];

  // Objekte / Gegendstände in der Szene
  Objects: IGameObject[];


}
