import {Component, Injectable, Input, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {GameObjectTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {GameCharacterTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {EntityTypeEnum} from '../../../../../data/schema/Classes/Storage/EntityTypeEnum';
import {EditorService} from '../../../services/editor.service';

@Component({
  selector: 'app-main-content-module',
  templateUrl: './main-content-module.component.html',
  styleUrls: ['./main-content-module.component.css']
})
@Injectable()
export class MainContentModuleComponent implements OnInit, OnDestroy {

  @Input() selectedTemplateObservable: Observable<GameObjectTemplate|GameCharacterTemplate>;

  public selectedObject: GameObjectTemplate|GameCharacterTemplate;
  public entityTypes = EntityTypeEnum;

  private selectedObjectSubscription: Subscription;

  constructor(private editorService: EditorService) { }

  Save() {
    this.editorService.SavePackage();
  }

  ngOnInit() {
    if (this.selectedTemplateObservable !== undefined) {
      this.selectedObjectSubscription = this.selectedTemplateObservable.subscribe(next => {
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
