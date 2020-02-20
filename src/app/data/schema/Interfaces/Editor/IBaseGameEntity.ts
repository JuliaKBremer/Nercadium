import { Type } from '@angular/compiler';


export interface IBaseGameEntity {

  // ID des Objects
  id: number;

  // Name / Bezeichung
  Name: string;

  // Beschreibung
  Description: string;

  GetEntityType(): number;

}
