// Mirco Hölzenbein, FEB. 18, 20
// PAFHandler - PackageAllocationFileHandler
// Verwaltet / Wertet Informationen zu einer PAFile (PackageAllocationFile) aus,
// um so die Objektverweise auf die JSON-Dateien ausfindig zu machen.

import {IPAFEntry} from '../../Interfaces/storage/IPAFEntry';
import {Type} from '@angular/compiler';
import {EntityTypeEnum} from './EntityTypeEnum';

export class PAFEntry implements IPAFEntry {
  fileName: string;
  filePath: string;
  type: EntityTypeEnum;
}
