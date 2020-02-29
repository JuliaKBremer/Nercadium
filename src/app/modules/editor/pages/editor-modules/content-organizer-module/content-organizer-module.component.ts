import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IObject} from "../../../../../data/schema/Interfaces/Editor/IObject";

@Component({
  selector: 'app-content-organizer-module',
  templateUrl: './content-organizer-module.component.html',
  styleUrls: ['./content-organizer-module.component.css']
})
export class ContentOrganizerModuleComponent implements OnInit {
  @Output() objectClicked = new EventEmitter<IObject>();
  @Output() addObject = new EventEmitter();
  @Output() copyObject = new EventEmitter<IObject>();
  @Output() deleteObject = new EventEmitter<IObject>();
  @Output() selectObject = new EventEmitter<IObject>();

  @Input() objectList: IObject[];

  constructor() { }

  ngOnInit() {
  }
}
