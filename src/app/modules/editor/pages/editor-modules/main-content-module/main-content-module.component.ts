import {Component, Injectable, Input, OnInit, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {EntityTypeEnum} from '../../../../../data/schema/Classes/Storage/EntityTypeEnum';

@Component({
  selector: 'app-main-content-module',
  templateUrl: './main-content-module.component.html',
  styleUrls: ['./main-content-module.component.css']
})
@Injectable()
export class MainContentModuleComponent implements OnInit, OnDestroy {

  @Input() selectedObjectObservable: Observable<any>;

  public selectedObject: BehaviorSubject<any>;
  public entityTypes = EntityTypeEnum;

  private selectedObjectSubscription: Subscription;

  constructor() {
    this.selectedObject = new BehaviorSubject<any>(null);
  }

  ngOnInit() {
    if (this.selectedObjectObservable !== undefined) {
      this.selectedObjectSubscription = this.selectedObjectObservable.subscribe(next => {
        this.selectedObject.next(next);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.selectedObjectSubscription) {
      this.selectedObjectSubscription.unsubscribe();
    }
  }
}
