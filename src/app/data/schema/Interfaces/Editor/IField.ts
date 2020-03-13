import {IProperties} from './IProperty';

export interface IField {
  ID: number;
  Properties: IProperties;
  // TODO: IsCollapsed to own interface.
  IsCollapsed: boolean;
}
