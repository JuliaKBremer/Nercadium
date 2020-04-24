import {Component, Input, OnInit} from '@angular/core';
import {IProperties, IProperty} from '../../../../../../data/schema/Interfaces/Editor/IProperty';
import {PropertyTypes} from '../../../../../../data/schema/Enums/property-types.enum';
import {KeyValue} from '@angular/common';
import {EventService} from '../../../../../../core/service/event/event.service';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertiesListComponent implements OnInit {

  @Input() properties: IProperties;

  public propertyType = PropertyTypes;

  constructor(private eventService: EventService) { }

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
    if (property.changeFireEvent) {
      this.eventService.broadcast(property.changeFireEvent, property);
    }
  }
}
