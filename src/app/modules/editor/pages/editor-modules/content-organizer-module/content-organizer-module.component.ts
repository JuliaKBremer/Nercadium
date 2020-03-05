import {Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-content-organizer-module',
  templateUrl: './content-organizer-module.component.html',
  styleUrls: ['./content-organizer-module.component.css']
})
export class ContentOrganizerModuleComponent implements OnInit, OnDestroy {

  @Input() objectListObservable: Observable<any[]>;

  @Output() addObject = new EventEmitter();
  @Output() copyObject = new EventEmitter<any>();
  @Output() deleteObject = new EventEmitter<any>();
  @Output() selectObject = new EventEmitter<any>();

  public objectList: any[];

  private objectListSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (this.objectListObservable) {
      this.objectListSubscription = this.objectListObservable.subscribe(next => {
        this.objectList = next;
      });
    }
  }

  ngOnDestroy() {
    if (this.objectListSubscription) {
      this.objectListSubscription.unsubscribe();
    }
  }
}
