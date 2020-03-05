import {IField} from './IField';
import {IProperties} from './IProperty';

export interface ITemplate {
  // Discriminator: string;
  // ID: number;
  Properties: IProperties;
  Fields: IField[];
}
