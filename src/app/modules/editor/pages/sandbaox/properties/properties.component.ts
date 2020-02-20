import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComponentTypes, IComponent, ITemplate} from "../template.service";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  @Input() selectedTemplate: ITemplate;

  @Output() addComponent = new EventEmitter<ITemplate>();
  @Output() changeComponentType = new EventEmitter<{IComponent: IComponent, ComponentType: ComponentTypes}>();

  public objectKeys = Object.keys;
  public typeOf(object) {return typeof object};
  public ComponentTypes = ComponentTypes;

  constructor() { }

  ngOnInit() {
  }

  public orderComponents(components: IComponent[]): IComponent[] {
    if(!components)
      return;

    return components.sort((a, b) => a.properties.order - b.properties.order);
  }

  public changeType(IComponent: IComponent, ComponentTypes: ComponentTypes) {
    this.changeComponentType.emit({IComponent, ComponentType: ComponentTypes});
  }

}
