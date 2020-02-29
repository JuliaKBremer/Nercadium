import { Injectable } from '@angular/core';
import {ITemplate} from "../../../../data/schema/Interfaces/Editor/ITemplate";
import {IObject} from "../../../../data/schema/Interfaces/Editor/IObject";

@Injectable({
  providedIn: 'root'
})
export class TemplateTabService {

  //Dummy
  private templates: ITemplate[] = [
    {
      Properties: {
        Name: {
          id: 0,
          value: 'Test'
        },
        Order: {
          id: 0,
          value: 0
        }
      },
      Fields: []
    }
  ];

  constructor() { }

  public GetTemplates() {
    return this.templates;
  }

  public AddTemplate() {
    let newTemplate: ITemplate = {
      Properties: {},
      Fields: []
    };

    newTemplate.Properties.Name = {value: 'New Template'};
    newTemplate.Properties.Order = {value: 0};

    this.templates.push(newTemplate);
  }

  public CopyTemplate(objectToCopy: IObject) {
    this.templates.push(JSON.parse(JSON.stringify(objectToCopy)));
  }

  public DeleteTemplate(objectToDelete: IObject) {
    this.templates = this.templates.filter(obj => obj !== objectToDelete);
  }
}
