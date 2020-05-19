import {PropertyTypes} from '../../Enums/property-types.enum';

export interface IProperty {

  // ID der Property / Eigenschaft
  id: number;

  // parent template of the property
  parentTemplateID?: number;

  // parent field of the property
  parentFieldID?: number;

  // parent gameObject of the property
  parentObjectID?: number;

  // Vergebener Wert
  value: any;

  // Beschreibung zu dem Property / was es sein soll..
  description?: string;

  // Type evtl. hierfür ein Enum?
  type: PropertyTypes;

  // Falls type den Wert Enum hat muss enum den Enum als Object gegeben werden.
  enum?: any;

  // Wenn type den Wert Enum hat kann man ein Event abfeuern lassen wenn der Wert geändert wird.
  changeFireEvent?: string;
}

export interface IProperties {
  [key: string]: IProperty;
}
