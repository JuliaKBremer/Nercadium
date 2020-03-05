import {IField} from './IField';
import {IProperties} from './IProperty';

export interface ITemplate {
  ID: number;
  Properties: IProperties;
  Fields: IField[];
}
