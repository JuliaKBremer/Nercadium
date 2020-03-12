import { Type } from '@angular/compiler';
import {EntityTypeEnum} from '../../Classes/Storage/EntityTypeEnum';


export interface IBaseGameEntity {

  // ID des Objects
  id: number;

  // Name / Bezeichung
  Name: string;

  // Beschreibung
  Description: string;

  GetEntityType(): EntityTypeEnum;

}
