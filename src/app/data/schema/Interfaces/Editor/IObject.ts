import {IProperties} from './IProperty';
import {ITemplate} from './ITemplate';

export interface IObject {
  Discriminator: string;
  ID: number;
  Properties: IProperties;
  Template?: ITemplate;
  FieldValues?: any;
}
