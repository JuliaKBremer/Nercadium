import {TemplateObjectBase} from "./templateObjectBase";

export class TemplateObjectDropdown extends TemplateObjectBase<string> {
  controlType = 'dropdown';
  options: {key: string, value: string}[] = [];

  constructor(objects: {} = {}) {
    super(objects);
    this.options = objects['options'] || [];
  }
}
