import { Type } from '@angular/compiler';
import {EntityTypeEnum} from '../../Classes/Storage/EntityTypeEnum';


export interface IBaseGameEntity {

  // Gibt die Tags für ein Entity an
  Tags: string[];

  // ID des Objects
  id: number;

  // Name / Bezeichung
  Name: string;

  // Beschreibung
  Description: string;

  // Gibt den Typen des Objekt zurück.
  EntityType: EntityTypeEnum;


}
