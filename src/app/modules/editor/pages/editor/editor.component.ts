import {Component, OnDestroy, OnInit} from '@angular/core';
import {EditorService, RightSidebarStateEnum} from '../../services/editor/editor.service';
import {EntityTypeEnum} from '../../../../data/schema/Classes/Storage/EntityTypeEnum';
import {IBaseGameEntity} from '../../../../data/schema/Interfaces/Editor/IBaseGameEntity';
import {Subscription} from 'rxjs';
import {FieldService} from '../../services/field/field.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {

  public entityTypeEnum = EntityTypeEnum;
  public buttonsLeft = [EntityTypeEnum.Chapter, EntityTypeEnum.Scene, EntityTypeEnum.Object, EntityTypeEnum.Character, EntityTypeEnum.Note];

  public rightSidebarStateEnum = RightSidebarStateEnum;
  public buttonsRight = [RightSidebarStateEnum.Properties, RightSidebarStateEnum.Fields];

  private selectedObjectSubscription: Subscription;

  constructor(public editorService: EditorService, public fieldService: FieldService) { }

  ngOnInit() {
    this.selectedObjectSubscription = this.editorService.GetSelectedObjectAsObservable().subscribe(next => {
      if (next && next.Fields) {
        this.buttonsRight = [RightSidebarStateEnum.Properties, RightSidebarStateEnum.Fields];
      } else {
        this.buttonsRight = [RightSidebarStateEnum.Properties];
        if (this.editorService.currentSelectedRightState === RightSidebarStateEnum.Fields) {
          this.editorService.currentSelectedRightState = RightSidebarStateEnum.Properties;
        }
      }
    });
  }

  ngOnDestroy() {
    this.selectedObjectSubscription.unsubscribe();
  }

  public NewObject() {
    this.editorService.NewObject();
  }

  public CopyObject(entry: IBaseGameEntity) {
    this.editorService.CopyObject(entry);
  }

  public DeleteObject(entry: IBaseGameEntity) {
    this.editorService.DeleteObject(entry);
  }

  public setCurrentSidebarLeft(entityType: EntityTypeEnum) {
    this.editorService.currentSelectedEntityType = entityType;
  }

  public setCurrentSidebarRight(state: RightSidebarStateEnum) {
    this.editorService.currentSelectedRightState = state;
  }

  public setSelectedObject(entity: IBaseGameEntity) {
    this.editorService.SetSelectedObject(entity);
  }
}
