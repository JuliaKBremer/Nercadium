import {IProperties} from './IProperty';
import {ITemplate} from './ITemplate';

export interface IObject {
  Properties: IProperties;
  Template?: ITemplate;
  FieldValues?: any;
}
