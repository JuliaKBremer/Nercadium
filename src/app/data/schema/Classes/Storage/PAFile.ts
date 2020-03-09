// Mirco Hölzenbein, FEB. 17, 20
// PAFile - PackageAllocationFile
// Definiert als Index die Verweise auf die zu ladenen JSON Objekte.

import {IPAFile} from '../../Interfaces/storage/IPAFile';
import {IPAFEntry} from '../../Interfaces/storage/IPAFEntry';

export class PAFile implements IPAFile {
  Entries: IPAFEntry[];
  Description: string;
  Name: string;
  fileName: string;
  filePath: string;
}


