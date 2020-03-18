import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProperties, IProperty} from '../../../../../../data/schema/Interfaces/Editor/IProperty';
import {PropertyTypes} from '../../../../../../data/schema/Enums/property-types.enum';
import {FieldTypes} from '../../../../../../data/schema/Enums/field-types.enum';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertiesListComponent implements OnInit {

  @Input() properties: IProperties;

  @Output() selectChanged = new EventEmitter<FieldTypes>();

  public propertyType = PropertyTypes;

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index: any) {
    return index;
  }

  indexOrder = (akv: KeyValue<string, IProperty>, bkv: KeyValue<string, IProperty>): number => {
    const a = akv.value.id;
    const b = bkv.value.id;

    return a > b ? 1 : (b > a ? -1 : 0);
    // tslint:disable-next-line:semicolon
  };

  AddToArray(array: ['']) {
    const newObject = '';
    array.push(newObject);
  }

  DeleteFromArray(array: [''], index: number) {
    array.splice(index, 1);
  }

  CheckSelectChange(property: IProperty) {
    if (!property.checkChange) {
      return;
    }

    if (Object.values(FieldTypes).includes(property.value)) {
      this.selectChanged.emit(property.value);
    }
  }
}
