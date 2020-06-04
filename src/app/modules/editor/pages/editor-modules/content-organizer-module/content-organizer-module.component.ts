import {Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {GameObjectTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {GameCharacterTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';

@Component({
  selector: 'app-content-organizer-module',
  templateUrl: './content-organizer-module.component.html',
  styleUrls: ['./content-organizer-module.component.css']
})
export class ContentOrganizerModuleComponent implements OnInit, OnDestroy {

  @Input() objectTemplateListObservable: Observable<GameObjectTemplate[]>;
  @Input() characterTemplateListObservable: Observable<GameCharacterTemplate[]>;

  @Output() addObjectTemplate = new EventEmitter();
  @Output() addCharacterTemplate = new EventEmitter();
  @Output() copyObject = new EventEmitter<number>();
  @Output() deleteObject = new EventEmitter<number>();
  @Output() selectObject = new EventEmitter<number>();

  public objectTemplateList: GameObjectTemplate[];
  public characterTemplateList: GameCharacterTemplate[];

  private objectTemplateListSubscription: Subscription;
  private characterTemplateListSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    if (this.objectTemplateListObservable) {
      this.objectTemplateListSubscription = this.objectTemplateListObservable.subscribe(next => {
        this.objectTemplateList = next;
      });
    }

    if (this.characterTemplateListObservable) {
      this.characterTemplateListSubscription = this.characterTemplateListObservable.subscribe(next => {
        this.characterTemplateList = next;
      });
    }
  }

  ngOnDestroy() {
    if (this.objectTemplateListSubscription) {
      this.objectTemplateListSubscription.unsubscribe();
    }

    if (this.characterTemplateListSubscription) {
      this.characterTemplateListSubscription.unsubscribe();
    }
  }
}
