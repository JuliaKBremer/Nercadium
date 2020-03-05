import {Component, Injectable, Input, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {IObject} from '../../../../../data/schema/Interfaces/Editor/IObject';

@Component({
  selector: 'app-main-content-module',
  templateUrl: './main-content-module.component.html',
  styleUrls: ['./main-content-module.component.css']
})
@Injectable()
export class MainContentModuleComponent implements OnInit, OnDestroy {

  @Input() selectedObjectObservable: Observable<IObject>;

  public selectedObject: IObject;

  private selectedObjectSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (this.selectedObjectObservable !== undefined) {
      this.selectedObjectSubscription = this.selectedObjectObservable.subscribe(next => {
        this.selectedObject = next;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.selectedObjectSubscription) {
      this.selectedObjectSubscription.unsubscribe();
    }
  }
}
