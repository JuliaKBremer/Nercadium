// tslint:disable-next-line:no-empty-interface

import {Type} from '@angular/compiler';
import {EntityTypeEnum} from '../../Classes/Storage/EntityTypeEnum';

export interface IPAFEntry {
  filePath: string;
  fileName: string;
  type: EntityTypeEnum;
}
