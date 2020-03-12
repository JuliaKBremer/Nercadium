// tslint:disable-next-line:no-empty-interface

import {IPAFEntry} from './IPAFEntry';

export interface IPAFile {
  filePath: string;
  fileName: string;
  Description: string;
  Entries: IPAFEntry[];
}
