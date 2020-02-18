import { Component, OnInit } from '@angular/core';
import {IItem, ISamlung, TemplateService} from "../template.service";

@Component({
  selector: 'app-template-tab',
  templateUrl: './template-tab.component.html',
  styleUrls: ['./template-tab.component.css']
})
export class TemplateTabComponent implements OnInit {

  public samlung: ISamlung = {items: []};
  public selectedItem: IItem;

  constructor(private templateService: TemplateService) { }

  ngOnInit() {
    this.samlung = this.templateService.getSammlung();
    this.selectedItem = this.templateService.getSelectedItem();
  }

  public itemClicked(item: IItem) {
    this.templateService.clickItem(item);
    this.selectedItem = this.templateService.getSelectedItem();
  }

  public addTemplate() {
    this.templateService.addTemplate();
  }

  public addComponent(item: IItem) {
    this.templateService.addComponent(item);
  }
}
