import {IProperties} from './IProperty';

export interface IField {
  Discriminator: string;
  ID: number;
  Properties: IProperties;
  IsCollapsed: boolean;
}
