import {Injectable} from '@angular/core';
import {ITemplate} from '../../../../data/schema/Interfaces/Editor/ITemplate';
import {IObject} from '../../../../data/schema/Interfaces/Editor/IObject';
import {PropertyTypes} from '../../../../data/schema/Enums/property-types.enum';

@Injectable({
  providedIn: 'root'
})
export class TemplateTabService {

  // Dummy
  private templates: ITemplate[] = [
    {
      Properties: {
        Name: {
          id: 0,
          value: 'Test',
          type: PropertyTypes.string
        },
        Order: {
          id: 0,
          value: 0,
          type: PropertyTypes.number
        }
      },
      Fields: [
        {
          Properties: {
            Name: {
              id: 0,
              value: 'Test Field',
              type: PropertyTypes.string
            },
            Order: {
              id: 0,
              value: 0,
              type: PropertyTypes.number
            },
            Type: {
              id: 0,
              value: 'textBox',
              type: PropertyTypes.string
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
    const newTemplate: ITemplate = {
      Properties: {},
      Fields: []
    };

    newTemplate.Properties.Name = {id: 0, value: 'New Template', type: PropertyTypes.string};
    newTemplate.Properties.Order = {id: 0, value: 0, type: PropertyTypes.number};
    newTemplate.Properties.Type = {id: 0, value: PropertyTypes.boolean, type: PropertyTypes.enum, enum: PropertyTypes};

    this.templates.push(newTemplate);
  }

  public CopyTemplate(objectToCopy: IObject) {
    this.templates.push(JSON.parse(JSON.stringify(objectToCopy)));
  }

  public DeleteTemplate(objectToDelete: IObject) {
    if (objectToDelete === this.selectedTemplate) {
      this.selectedTemplate = null;
    }

    this.templates = this.templates.filter(obj => obj !== objectToDelete);
  }

  public SelectTemplate(objectToSelect: IObject) {
    this.selectedTemplate = objectToSelect;
  }
}
