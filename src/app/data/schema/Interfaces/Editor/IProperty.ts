import {PropertyTypes} from '../../Enums/property-types.enum';

export interface IProperty {

  // ID der Property / Eigenschaft
  id: number;

  // Vergebener Wert
  value: any;

  // Beschreibung zu dem Property / was es sein soll..
  description?: string;

  // Type evtl. hierfür ein Enum?
  type: PropertyTypes;

  // Falls type den Wert Enum hat muss enum den Enum als Object gegeben werden.
  enum?: any;

  // Wenn type den Wert Enum hat kann man ein Event abfeuern lassen wenn der Wert geändert wird.
  checkChange?: boolean;
}

export interface IProperties {
  [key: string]: IProperty;
}
