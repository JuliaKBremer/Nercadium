import {IProperties} from './IProperty';
import {IField} from './IField';

export interface IGameObjectTemplate {
  // ID des Objekt-Template
  id: number;

  // Name des Template
  Name: string;

  // Zugewiesene Eigenschaften für das Template
  Properties: IProperties;

  // Template
  Fields: IField[];

  // Field values
  FieldValues: {[key: string]: any};
}
