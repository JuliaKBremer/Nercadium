import {Component, Input, OnInit} from '@angular/core';
import {FieldTypes} from '../../../../../../data/schema/Enums/field-types.enum';
import {GameObjectTemplate} from '../../../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {GameCharacterTemplate} from '../../../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';

@Component({
  selector: 'app-fields-display',
  templateUrl: './fields-display.component.html',
  styleUrls: ['./fields-display.component.css']
})
export class FieldsDisplayComponent implements OnInit {

  @Input() selectedObject: GameObjectTemplate|GameCharacterTemplate;

  public fieldTypes = FieldTypes;

  constructor() { }

  ngOnInit() {
  }

}
