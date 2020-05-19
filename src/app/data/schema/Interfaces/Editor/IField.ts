import {IProperties} from './IProperty';

export interface IField {
  ID: number;
  ParentID?: number;
  Properties: IProperties;
  // TODO: IsCollapsed to own interface.
  IsCollapsed: boolean;
}
