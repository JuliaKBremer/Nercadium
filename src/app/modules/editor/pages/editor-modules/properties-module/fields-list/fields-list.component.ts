import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IField} from '../../../../../../data/schema/Interfaces/Editor/IField';
import {FieldTypes} from '../../../../../../data/schema/Enums/field-types.enum';

@Component({
  selector: 'app-fields-list',
  templateUrl: './fields-list.component.html',
  styleUrls: ['./fields-list.component.css']
})
export class FieldsListComponent implements OnInit {

  @Input() fields: IField[];

  @Output() selectChanged = new EventEmitter();

  @Output() deleteField: EventEmitter<{fieldsToEdit: IField[], fieldToDelete: IField}> = new EventEmitter();
  @Output() copyField: EventEmitter<{fieldsToEdit: IField[], fieldToDelete: IField}> = new EventEmitter();

  public fieldTypes = FieldTypes;

  public objectKeys = Object.keys;

  constructor() { }

  ngOnInit() {
  }
}
