import {Component, Input, OnInit} from '@angular/core';
import {FieldTypes} from '../../../../../../data/schema/Enums/field-types.enum';
import {ITemplate} from '../../../sandbaox/template.service';

@Component({
  selector: 'app-fields-display',
  templateUrl: './fields-display.component.html',
  styleUrls: ['./fields-display.component.css']
})
export class FieldsDisplayComponent implements OnInit {

  @Input() selectedObject: {template: ITemplate};

  public fieldTypes = FieldTypes;

  constructor() { }

  ngOnInit() {
  }

}
