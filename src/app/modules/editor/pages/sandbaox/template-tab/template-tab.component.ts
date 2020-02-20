import { Component, OnInit } from '@angular/core';
import {ITemplate, ISamlung, TemplateService, IComponent, ComponentTypes} from "../template.service";

@Component({
  selector: 'app-template-tab',
  templateUrl: './template-tab.component.html',
  styleUrls: ['./template-tab.component.css']
})
export class TemplateTabComponent implements OnInit {

  public samlung: ISamlung = null;
  public selectedTemplate: ITemplate;

  constructor(private templateService: TemplateService) { }

  ngOnInit() {
    this.samlung = this.templateService.getSammlung();
  }

  public itemClicked(item: ITemplate) {
    this.selectedTemplate = item;
  }

  public addTemplate() {
    this.templateService.addTemplate();
  }

  public addComponent(item: ITemplate) {
    this.templateService.addComponent(item);
  }

  public changeComponentType(IComponent: IComponent, ComponentType: ComponentTypes) {
    this.templateService.changeComponent(IComponent, ComponentType);
  }
}
