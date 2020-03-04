import {IField} from './IField';
import {IProperties} from './IProperty';

export interface ITemplate {
  Order: number;
  Properties: IProperties;
  Fields: IField[];
}
