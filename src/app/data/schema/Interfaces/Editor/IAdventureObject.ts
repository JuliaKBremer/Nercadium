import {IGameObject} from './IGameObject';
import {IGameCharacter} from './IGameCharacter';
import {IGameScene} from './IGameScene';
import {IGameScript} from './IGameScript';

export interface IAdventureObject {
  id: number;
  Items: IGameObject[];
  Characters: IGameCharacter[];
  Scenes: IGameScene[];
  Scripts: IGameScript[];
  PreviewImgUrl: string;
  Name: string;
  Description: string;
  TypeDescription: string;
}
