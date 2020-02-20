import { Injectable } from '@angular/core';

export interface ISamlung {
  items: ITemplate[];
}

export interface ITemplate {
  properties: IProperties;
  components: IComponent[];
}

export interface IComponent {
  properties: IProperties;
}

export interface IProperties {
  [key: string]: any;
}

export enum ComponentTypes {
  textBox = 'textBox', number = 'number', select = 'select', textArea = 'textArea', table = 'table'
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private testSamlung: ISamlung = {items: []};

  public getSammlung() {
    return this.testSamlung;
  }

  public addTemplate() {
    let nextOrderNumber: number = this.testSamlung.items.length;

    this.testSamlung.items.push({components: [], properties: {order: nextOrderNumber, name: 'New Template ' + nextOrderNumber}});
  }

  public addComponent(item: ITemplate) {
    let nextOrderNumber: number = item.components.length;

    let component: IComponent = {properties: {order: nextOrderNumber, name: 'New Component ' + nextOrderNumber}};

    this.changeComponent(component, ComponentTypes.textBox);

    item.components.push(component);
  }

  public changeComponent(component: IComponent, type: ComponentTypes) {
    switch (type) {
      case ComponentTypes.textBox: {
        component.properties = {
          type: type,
          order: component.properties.order,
          lable: 'TextBox',
          value: 'Text',
          paddingLeft: 0
        };
        break;
      }
      case ComponentTypes.number: {
        component.properties = {
          type: type,
          order: component.properties.order,
          lable: 'NumberBox',
          value: 1337
        };
        break;
      }
      case ComponentTypes.select: {
        component.properties = {
          type: type,
          order: component.properties.order,
          lable: 'Select',
          value: 0,
          options: ['Option_0', 'Option_1']
        };
        break;
      }
      case ComponentTypes.textArea: {
        component.properties = {
          type: type,
          order: component.properties.order,
          lable: 'Text Area',
          value: '',
          readonly: false,
          height: 30,
          width: 4,
          maxlength: 100,
          placeholder: 'Textbox'
        };
        break;
      }
      case ComponentTypes.table: {
        component.properties = {
          type: type,
          order: component.properties.order,
          lable: 'Table',

        };
        break;
      }
      default: {
        this.changeComponent(component, ComponentTypes.textBox);
        break;
      }
    }
  }
}
