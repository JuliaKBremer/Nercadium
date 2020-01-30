import {IGameCharacterTemplate} from './IGameCharacterTemplate';

export interface IGameCharacter {
  id: number;
  Name: string;
  Descripton: string;
  CharacterTemplate: IGameCharacterTemplate;
}
