import {TemplateObjectBase} from "./templateObjectBase";

export class TemplateObjectTextInput extends TemplateObjectBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(objects: {} = {}) {
    super(objects);
    this.type = objects['type'] || '';
  }
}

