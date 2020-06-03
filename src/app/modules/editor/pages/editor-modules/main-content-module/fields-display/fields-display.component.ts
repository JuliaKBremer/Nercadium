import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FieldTypes} from '../../../../../../data/schema/Enums/field-types.enum';
import {GameObjectTemplate} from '../../../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {GameCharacterTemplate} from '../../../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {GetTableStyleFromEnum, TableStyles} from '../../../../../../data/schema/Enums/table-styles.enum';
import {IField} from '../../../../../../data/schema/Interfaces/Editor/IField';
import {GameObject} from '../../../../../../data/schema/Classes/Editor/Objects/GameObject';
import {EntityTypeEnum} from '../../../../../../data/schema/Classes/Storage/EntityTypeEnum';
import {TemplateTabService} from '../../../template-tab/template-tab.service';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-fields-display',
  templateUrl: './fields-display.component.html',
  styleUrls: ['./fields-display.component.css']
})
export class FieldsDisplayComponent implements OnInit, OnDestroy {

  @Input() selectedObjectObservable: Observable<any>;

  public selectedObject: any;
  private selectedObjectSubscription: Subscription;

  public fieldTypes = FieldTypes;

  public fields: IField[] = [];

  constructor(private templateTabService: TemplateTabService) { }

  ngOnInit() {
    if (this.selectedObjectObservable !== undefined) {
      this.selectedObjectSubscription = this.selectedObjectObservable.subscribe(next => {
        this.selectedObject = next;
        if (this.selectedObject !== null) {
          switch (this.selectedObject.EntityType) {
            case EntityTypeEnum.Object:
              const sO = this.selectedObject as GameObject;
              const template: GameObjectTemplate = this.templateTabService.FindTemplateByID(sO.Properties.Template.value);
              if (template) {
                this.fields = template.Fields;
              }
              break;
            case EntityTypeEnum.Character:
              break;
            case EntityTypeEnum.CharacterTemplate:
              this.fields = (this.selectedObject as GameCharacterTemplate).Fields;
              break;
            case EntityTypeEnum.ObjectTemplate:
              this.fields = (this.selectedObject as GameObjectTemplate).Fields;
              break;
          }
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.selectedObjectSubscription.unsubscribe();
  }

  changeTableContent(fieldID: number, row: number, col: number, innerHTML: string) {
    this.selectedObject.FieldValues[fieldID][row][col] = innerHTML;
  }

  checkTable(fieldID: number, row: number, col: number) {
    if (this.selectedObject.FieldValues[fieldID][row] !== 'undefined') {
      this.selectedObject.FieldValues[fieldID][row] = [];

      if (this.selectedObject.FieldValues[fieldID][row][col] !== 'undefined') {
        this.selectedObject.FieldValues[fieldID][row][col] = row.toString() + ',' + col.toString();
      }
    }
  }

  getTableStyle(tableStyle: TableStyles) {
    return GetTableStyleFromEnum(tableStyle);
  }

  onFileChanged(fieldID: number, event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = () => { // called once readAsDataURL is completed
        this.selectedObject.FieldValues[fieldID] = reader.result;
      };
    }
  }
}
