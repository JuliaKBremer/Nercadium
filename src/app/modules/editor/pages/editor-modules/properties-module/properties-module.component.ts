import {Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {IProperties} from '../../../../../data/schema/Interfaces/Editor/IProperty';
import {IField} from '../../../../../data/schema/Interfaces/Editor/IField';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-properties-module',
  templateUrl: './properties-module.component.html',
  styleUrls: ['./properties-module.component.css']
})
export class PropertiesModuleComponent implements OnInit, OnDestroy {

  @Input() selectedObjectObservable: Observable<any>;

  @Output() addField = new EventEmitter<number>();
  @Output() deleteField = new EventEmitter<{fieldNumber: number, templateNumber: number}>();
  @Output() copyField = new EventEmitter<{fieldNumber: number, templateNumber: number}>();

  public selectedObject: any;
  public properties: IProperties;
  public fields: IField[];

  private selectedObjectSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (this.selectedObjectObservable !== undefined) {
        this.selectedObjectSubscription = this.selectedObjectObservable.subscribe(next => {
        this.selectedObject = next;

        if (this.selectedObject) {
        this.checkProps(this.selectedObject);
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.selectedObjectSubscription) {
      this.selectedObjectSubscription.unsubscribe();
    }
  }

  private checkProps(object) {
    if (typeof(object.Properties) !== 'undefined') {
      this.properties = object.Properties;
    } else {
      this.properties = null;
    }

    if (typeof(object.Fields) !== 'undefined') {
      this.fields = object.Fields;
    } else {
      this.fields = null;
    }
  }
}
