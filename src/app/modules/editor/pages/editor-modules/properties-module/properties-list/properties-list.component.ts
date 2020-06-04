import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IProperties} from '../../../../../../data/schema/Interfaces/Editor/IProperty';
import {PropertyTypes} from '../../../../../../data/schema/Enums/property-types.enum';
import {FieldTypes} from '../../../../../../data/schema/Enums/field-types.enum';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertiesListComponent implements OnInit {

  @Input() properties: IProperties;

  @Output() selectChanged = new EventEmitter<FieldTypes>();

  public propertyType = PropertyTypes;

  public objectKeys = Object.keys;

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index: any) {
    return index;
  }

  AddToArray(array: ['']) {
    const newObject = '';
    array.push(newObject);
  }

  // DeleteFromArray(array: [], index: number) {
  //
  // }
}
