import {Component, Input, OnInit} from '@angular/core';
import {IItem} from "../template.service";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  @Input() selectedItem: IItem;

  public objectKeys = Object.keys;

  constructor() { }

  ngOnInit() {
  }

}
