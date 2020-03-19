import {Component, Input, OnInit} from '@angular/core';
import {FieldTypes} from '../../../../../../data/schema/Enums/field-types.enum';
import {GameObjectTemplate} from '../../../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {GameCharacterTemplate} from '../../../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {GetTableStyleFromEnum, TableStyles} from '../../../../../../data/schema/Enums/table-styles.enum';

@Component({
  selector: 'app-fields-display',
  templateUrl: './fields-display.component.html',
  styleUrls: ['./fields-display.component.css']
})
export class FieldsDisplayComponent implements OnInit {

  @Input() selectedObject: GameObjectTemplate|GameCharacterTemplate;

  public fieldTypes = FieldTypes;

  constructor() { }

  ngOnInit() {
  }

  changeTableContent(fieldID: number, row: number, col: number, innerHTML: string) {
    this.selectedObject.FieldValues[fieldID][row][col] = innerHTML;
  }

  checkTable(fieldID: number, row: number, col: number) {
    if (this.selectedObject.FieldValues[fieldID][row] !== 'undefined') {
      this.selectedObject.FieldValues[fieldID][row] = [];

      if (this.selectedObject.FieldValues[fieldID][row][col] !== 'undefined') {
        this.selectedObject.FieldValues[fieldID][row][col] = row.toString() + ',' + col.toString();
      }
    }
  }

  getTableStyle(tableStyle: TableStyles) {
    return GetTableStyleFromEnum(tableStyle);
  }

  onFileChanged(fieldID: number, event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = () => { // called once readAsDataURL is completed
        this.selectedObject.FieldValues[fieldID] = reader.result;
      };
    }
  }
}
