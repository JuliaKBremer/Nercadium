import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITemplate, ISamlung} from "../template.service";

@Component({
  selector: 'app-sammlung',
  templateUrl: './sammlung.component.html',
  styleUrls: ['./sammlung.component.css']
})
export class SammlungComponent implements OnInit {
  @Output() itemClicked = new EventEmitter<ITemplate>();
  @Output() addTemplate = new EventEmitter();

  @Input() samlung: ISamlung;

  constructor() { }

  ngOnInit() {
  }

  public clickItem(item: ITemplate) {
    this.itemClicked.emit(item);
  }

  public orderTemplate(items: ITemplate[]): ITemplate[] {
    if(!items)
      return;

    return items.sort((a, b) => a.properties.order - b.properties.order);
  }

}
