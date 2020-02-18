import { Injectable } from '@angular/core';

export interface ISamlung {
  items: IItem[];
}
export interface IItem {
  isCollapse: boolean;
  isSelected: boolean;
  properties: IProperties;
  components: IItem[];
}

export interface IProperties {
  name: string;
  order: number;
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private testSamlung: ISamlung = {items: []};

  public getSammlung() {
    return this.testSamlung;
  }

  public getSelectedItem() {
    return this.selectedItem;
  }

  private selectedItem: IItem;

  public clickItem(item: IItem) {
    if(this.selectedItem)
      this.selectedItem.isSelected = false;

    this.selectedItem = item;
    this.selectedItem.isSelected = true;
  }

  public addTemplate() {
    let nextOrderNumber: number = this.testSamlung.items.length;

    this.testSamlung.items.push({isSelected: false, isCollapse: false, components: [], properties: {order: nextOrderNumber, name: 'New Template ' + nextOrderNumber}});
  }

  public addComponent(item: IItem) {
    let nextOrderNumber: number = item.components.length;

    item.components.push({isSelected: false, isCollapse: false, components: [], properties: {order: nextOrderNumber, name: 'New Child ' + nextOrderNumber}});
  }
}
