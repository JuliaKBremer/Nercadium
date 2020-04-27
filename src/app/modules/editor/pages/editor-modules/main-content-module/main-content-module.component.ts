import {Component, Injectable, Input, OnInit, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {EntityTypeEnum} from '../../../../../data/schema/Classes/Storage/EntityTypeEnum';
import {EditorService} from '../../../services/editor.service';

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

  constructor(private editorService: EditorService) {
    this.selectedObject = new BehaviorSubject<any>(null);
  }

  // TODO: Find other place to save
  Save() {
    this.editorService.SavePackage();
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
