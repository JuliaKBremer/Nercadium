import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IField} from '../../../../../../data/schema/Interfaces/Editor/IField';
import {FieldService} from '../../../../services/field/field.service';
import {Observable, Subscription} from 'rxjs';
import {IBaseGameEntity} from '../../../../../../data/schema/Interfaces/Editor/IBaseGameEntity';

@Component({
  selector: 'app-fields-list',
  templateUrl: './fields-list.component.html',
  styleUrls: ['./fields-list.component.css']
})
export class FieldsListComponent implements OnInit, OnDestroy {

  public selectedObjectFields: IField[];
  public selectedObject: any;

  @Input() selectedObjectObservable: Observable<IBaseGameEntity>;
  private selectedObjectSubscription: Subscription;

  constructor(public fieldService: FieldService) { }

  ngOnInit() {
    this.selectedObjectSubscription = this.selectedObjectObservable.subscribe(next => {
      this.selectedObject = next;

      if (this.selectedObject === null) {
        this.selectedObjectFields = null;
        return;
      }

      this.selectedObjectFields = next.Fields;
    });
  }

  ngOnDestroy() {
    this.selectedObjectSubscription.unsubscribe();
  }
}
