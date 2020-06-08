import {Component, Injectable, Input, OnInit, OnDestroy} from '@angular/core';
import {EntityTypeEnum} from '../../../../../data/schema/Classes/Storage/EntityTypeEnum';
import {IBaseGameEntity} from '../../../../../data/schema/Interfaces/Editor/IBaseGameEntity';

enum TypeEnum {
  text,
  fields
}
@Component({
  selector: 'app-main-content-module',
  templateUrl: './main-content-module.component.html',
  styleUrls: ['./main-content-module.component.css']
})
@Injectable()
export class MainContentModuleComponent implements OnInit, OnDestroy {

  private $selectedObject: IBaseGameEntity;
  public objectType: TypeEnum;
  public TypeEnum = TypeEnum;

  @Input() set selectedObject(selectedObject: IBaseGameEntity) {
    if (selectedObject === null) {
      return;
    }

    switch (selectedObject.EntityType) {
      case EntityTypeEnum.Object:
        this.objectType = TypeEnum.fields;
        break;
      case EntityTypeEnum.Chapter:
        this.objectType = TypeEnum.text;
        break;
      case EntityTypeEnum.Character:
        this.objectType = TypeEnum.fields;
        break;
      case EntityTypeEnum.Note:
        this.objectType = TypeEnum.text;
        break;
      case EntityTypeEnum.Scene:
        this.objectType = TypeEnum.text;
        break;
      case EntityTypeEnum.CharacterTemplate:
        this.objectType = TypeEnum.fields;
        break;
      case EntityTypeEnum.ObjectTemplate:
        this.objectType = TypeEnum.fields;
        break;
      default:
        this.objectType = null;
        break;
    }

    this.$selectedObject = selectedObject;
  }

  get selectedObject(): IBaseGameEntity {
    return this.$selectedObject;
  }

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() { }
}
