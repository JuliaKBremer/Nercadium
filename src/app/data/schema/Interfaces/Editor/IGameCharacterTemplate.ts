import {IProperties} from './IProperty';
import {IField} from './IField';

export interface IGameCharacterTemplate {
  // ID des Templates
  id: number;

  // Name des Templates
  Name: string;

  // Voralge der Eigenschaften
  Properties: IProperties;

  // Template
  Fields: IField[];

  // Field values
  FieldValues: {[key: string]: any};
}
