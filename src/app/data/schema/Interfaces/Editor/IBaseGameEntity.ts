import {EntityTypeEnum} from '../../Classes/Storage/EntityTypeEnum';
import {IProperties} from './IProperty';
import {IField} from './IField';


export interface IBaseGameEntity {

  // ID des Objects
  id: number;

  // Name / Bezeichung
  Name: string;

  // Gibt den Typen des Objekt zurück.
  EntityType: EntityTypeEnum;

  Properties: IProperties;

  Fields?: IField[];
  FieldValues?: {[fieldID: string]: any};
}
