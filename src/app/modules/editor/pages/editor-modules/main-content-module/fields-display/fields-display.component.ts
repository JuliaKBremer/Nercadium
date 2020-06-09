import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FieldTypes} from '../../../../../../data/schema/Enums/field-types.enum';
import {GetTableStyleFromEnum, TableStyles} from '../../../../../../data/schema/Enums/table-styles.enum';
import {IField} from '../../../../../../data/schema/Interfaces/Editor/IField';
import {Observable, Subscription} from 'rxjs';
import {IBaseGameEntity} from '../../../../../../data/schema/Interfaces/Editor/IBaseGameEntity';

@Component({
  selector: 'app-fields-display',
  templateUrl: './fields-display.component.html',
  styleUrls: ['./fields-display.component.css']
})
export class FieldsDisplayComponent implements OnInit, OnDestroy {

  @Input() selectedObjectObservable: Observable<any>;

  public selectedObject: IBaseGameEntity;
  private selectedObjectSubscription: Subscription;

  public fieldTypes = FieldTypes;

  public fields: IField[] = [];

  constructor() { }

  ngOnInit() {
    if (this.selectedObjectObservable !== undefined) {
      this.selectedObjectSubscription = this.selectedObjectObservable.subscribe(next => {
        this.selectedObject = next;
        if (this.selectedObject !== null && this.selectedObject.Fields) {
          this.fields = this.selectedObject.Fields;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.selectedObjectSubscription.unsubscribe();
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
