import { Injectable } from '@angular/core';
import {Template} from "../../../data/schema/template/template";
import {TemplateObjectBase} from "../../../data/schema/template/templateObjectBase";

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  nextId: number = 1;
  tamplate: Template[] = [];
  selectedTemplate: Template;
  selectedTemplateObject: TemplateObjectBase<any>;

  constructor() { }

  public CreateNewTemplateObject() {
    this.tamplate.push(
      new Template(this.nextId++)
    );
  }

  public AddObjectToSelectedTemplate(templateId: number, templateObjcet: TemplateObjectBase<any>) {
    this.selectedTemplate.AddObjcet(templateObjcet);
  }



}
