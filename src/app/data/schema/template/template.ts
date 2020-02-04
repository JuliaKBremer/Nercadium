import {TemplateObjectBase} from "./templateObjectBase";

export class Template {
  id: number;
  name: string;
  objcets: TemplateObjectBase<any>[] = [];

  constructor(id: number) {
    this.id = id;
    this.name = 'Name';
  }

  public AddObjcet(objcet: TemplateObjectBase<any>) {
    this.objcets.push(objcet);
  }
}
