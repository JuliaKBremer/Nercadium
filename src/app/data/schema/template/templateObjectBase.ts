export class TemplateObjectBase<T> {
  value: T;
  id: number;
  lable: string;
  required: boolean;
  order: number;
  controlType: string;

  constructor(objects: {
    value?: T,
    id?: number,
    lable?: string,
    required?: boolean,
    order?: number,
    controlType?: string
  } = {}) {
    this.value = objects.value;
    this.id = objects.id || 0;
    this.lable = objects.lable || '';
    this.required = objects.required;
    this.order = objects.order === undefined ? 1 : objects.order;
    this.controlType = objects.controlType || '';
  }
}
