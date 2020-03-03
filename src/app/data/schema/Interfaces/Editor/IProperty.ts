import {PropertyTypes} from '../../Enums/property-types.enum';

export interface IProperty {

  // ID der Property / Eigenschaft
  id: number;

  // Vergebener Wert
  value: any;

  // Beschreibung zu dem Property / was es sein soll..
  // Description: string;

  // Type evtl. hierfür ein Enum?
  type: PropertyTypes;

  [key: string]: any;
}

export interface IProperties {
  [key: string]: IProperty;
}
