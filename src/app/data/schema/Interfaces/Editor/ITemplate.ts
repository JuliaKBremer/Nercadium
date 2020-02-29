import {IField} from "./IField";
import {IObject} from "./IObject";

export interface ITemplate extends IObject{
  Fields: IField[];
}
