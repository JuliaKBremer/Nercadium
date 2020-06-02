import {Component, Input, OnInit} from '@angular/core';
import {IField} from '../../../../../../data/schema/Interfaces/Editor/IField';
import {FieldService} from '../../../template-tab/field.service';

@Component({
  selector: 'app-fields-list',
  templateUrl: './fields-list.component.html',
  styleUrls: ['./fields-list.component.css']
})
export class FieldsListComponent implements OnInit {

  @Input() fields: IField[];

  constructor(public fieldService: FieldService) { }

  ngOnInit() {
  }
}
