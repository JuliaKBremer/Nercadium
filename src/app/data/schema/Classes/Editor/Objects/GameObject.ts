import {IGameObject} from '../../../Interfaces/Editor/IGameObject';
import {IProperty} from '../../../Interfaces/Editor/IProperty';
import {IGameObjectTemplate} from '../../../Interfaces/Editor/IGameObjectTemplate';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {Type} from '@angular/compiler';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';

export class GameObject implements IGameObject, IBaseGameEntity {

  // ID des Objekt
  id: number;

  // Name
  Name: string;

  // Beschreibung
  Description: string;

  // Zugewiesene Werte & Eigenschaften
  Properties: Array<IProperty>[];

  // Template das für dieses Objekt verwendet wird.
  ObjectTemplate: IGameObjectTemplate;

  GetEntityType(): EntityTypeEnum {
    return EntityTypeEnum.Object;
  }


}
