import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IField} from '../../../../../../data/schema/Interfaces/Editor/IField';

@Component({
  selector: 'app-fields-list',
  templateUrl: './fields-list.component.html',
  styleUrls: ['./fields-list.component.css']
})
export class FieldsListComponent implements OnInit {

  @Input() fields: IField[];

  @Output() deleteField = new EventEmitter<IField>();
  @Output() copyField = new EventEmitter<IField>();

  constructor() { }

  ngOnInit() {
  }
}
