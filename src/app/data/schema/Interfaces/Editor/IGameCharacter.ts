import {IProperties} from './IProperty';
import {IField} from './IField';

export interface IGameCharacter {

  // ID des Chars
  id: number;

  // Name / Bezeichung des Kapitel
  Name: string;

  Properties: IProperties;

  Fields: IField[];

  FieldValues: {[fieldId: string]: any};
}
