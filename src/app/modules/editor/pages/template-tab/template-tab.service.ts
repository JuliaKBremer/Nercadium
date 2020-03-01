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
          value: 'Test'
        },
        Order: {
          value: 0
        }
      },
      Fields: [
        {
          Properties: {
            Name: {
              value: 'Test Field'
            },
            Order: {
              value: 0
            },
            Type: {
              value: 'textBox'
            }
          }
        }
      ]
    }
  ];

  private selectedTemplate: IObject;

  constructor() { }

  public GetTemplates() {
    return this.templates;
  }

  public GetSelectedTemplate() {
    return this.selectedTemplate;
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
    if(objectToDelete === this.selectedTemplate)
      this.selectedTemplate = null;

    this.templates = this.templates.filter(obj => obj !== objectToDelete);
  }

  public SelectTemplate(objectToSelect: IObject) {
    this.selectedTemplate = objectToSelect;
  }
}
