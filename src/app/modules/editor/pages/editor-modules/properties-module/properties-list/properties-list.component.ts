import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IProperties, IProperty} from '../../../../../../data/schema/Interfaces/Editor/IProperty';
import {PropertyTypes} from '../../../../../../data/schema/Enums/property-types.enum';
import {KeyValue} from '@angular/common';
import {EventService} from '../../../../../../core/service/event/event.service';
import {Observable, Subscription} from 'rxjs';
import {IBaseGameEntity} from '../../../../../../data/schema/Interfaces/Editor/IBaseGameEntity';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertiesListComponent implements OnInit, OnDestroy {

  @Input() selectedObjectObservable: Observable<IBaseGameEntity>;
  private selectedObjectSubscription: Subscription;
  @Input() properties: IProperties = null;
  public propertyType = PropertyTypes;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    if (this.selectedObjectObservable) {
      this.selectedObjectSubscription = this.selectedObjectObservable.subscribe(next => {
        if (next !== null) {
          this.properties = next.Properties;
        } else {
          this.properties = null;
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.selectedObjectSubscription) {
      this.selectedObjectSubscription.unsubscribe();
    }
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
