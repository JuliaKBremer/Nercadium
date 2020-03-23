import {Component, EventEmitter, Input, OnInit, OnDestroy, Output} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {GameObjectTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {GameCharacterTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {GameObject} from '../../../../../data/schema/Classes/Editor/Objects/GameObject';

@Component({
  selector: 'app-content-organizer-module',
  templateUrl: './content-organizer-module.component.html',
  styleUrls: ['./content-organizer-module.component.css']
})
export class ContentOrganizerModuleComponent implements OnInit, OnDestroy {

  // Templates
  @Input() objectTemplateListObservable: Observable<GameObjectTemplate[]>;
  @Input() characterTemplateListObservable: Observable<GameCharacterTemplate[]>;

  @Output() addObjectTemplate = new EventEmitter();
  @Output() addCharacterTemplate = new EventEmitter();

  public objectTemplateList: GameObjectTemplate[];
  public characterTemplateList: GameCharacterTemplate[];

  private objectTemplateListSubscription: Subscription;
  private characterTemplateListSubscription: Subscription;

  // Objects
  @Input() objectListObservable: Observable<GameObject[]>;

  @Output() addObject = new EventEmitter();

  public objectList: GameObject[];

  private objectListSubscription: Subscription;


  @Output() copyObject = new EventEmitter<number>();
  @Output() deleteObject = new EventEmitter<number>();
  @Output() selectObject = new EventEmitter<number>();


  constructor() { }

  ngOnInit() {
    // Template
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

    // Object
    if (this.objectListObservable) {
      this.objectListSubscription = this.objectListObservable.subscribe(next => {
        this.objectList = next;
      });
    }
  }

  ngOnDestroy() {
    // Template
    if (this.objectTemplateListSubscription) {
      this.objectTemplateListSubscription.unsubscribe();
    }

    if (this.characterTemplateListSubscription) {
      this.characterTemplateListSubscription.unsubscribe();
    }

    // Object
    if (this.objectListSubscription) {
      this.objectListSubscription.unsubscribe();
    }
  }
}
