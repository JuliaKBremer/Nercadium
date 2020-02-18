import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IItem, ISamlung} from "../template.service";

@Component({
  selector: 'app-sammlung',
  templateUrl: './sammlung.component.html',
  styleUrls: ['./sammlung.component.css']
})
export class SammlungComponent implements OnInit {
  @Output() itemClicked = new EventEmitter<IItem>();
  @Output() addTemplate = new EventEmitter();
  @Output() addComponent = new EventEmitter<IItem>();

  @Input() samlung: ISamlung;

  constructor() { }

  ngOnInit() {
  }

  public clickItem(item: IItem) {
    item.isCollapse = !item.isCollapse;
    this.itemClicked.emit(item);
  }

  public orderItem(items: IItem[]): IItem[] {
    if(!items)
      return;

    return items.sort((a, b) => a.properties.order - b.properties.order);
  }

}
