import {IGameScene} from '../../../Interfaces/Editor/IGameScene';
import {INote} from '../../../Interfaces/Editor/INote';
import {IGameCharacter} from '../../../Interfaces/Editor/IGameCharacter';
import {IGameObject} from '../../../Interfaces/Editor/IGameObject';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {IProperties} from '../../../Interfaces/Editor/IProperty';

export class SceneObject implements IGameScene, IBaseGameEntity {

  // ID
  id: number;

  // Get Filename
  get Name(): string {
    return this.Properties.Name.value + ' ' + this.id;
  }
  set Name(name: string) {
    this.Properties.Name.value = name;
  }

  // Text des Kapitel
  Text: string;

  // Discriminator
  EntityType: EntityTypeEnum = EntityTypeEnum.Scene;

  // Properties
  Properties: IProperties;

  Characters: IGameCharacter[];
  Description: string;
  Notes: INote[];
  Objects: IGameObject[];
}
