import {IGameObject} from '../../../Interfaces/Editor/IGameObject';
import {IProperties} from '../../../Interfaces/Editor/IProperty';
import {IBaseGameEntity} from '../../../Interfaces/Editor/IBaseGameEntity';
import {EntityTypeEnum} from '../../Storage/EntityTypeEnum';
import {PropertyTypes} from '../../../Enums/property-types.enum';
import {FieldTypes} from '../../../Enums/field-types.enum';
import {IField} from '../../../Interfaces/Editor/IField';

export class GameObject implements IGameObject, IBaseGameEntity {

  // ID
  id: number;

  // Get Filename
  get Name(): string {
    return this.Properties.Name.value + ' ' + this.id;
  }
  set Name(name: string) {
    this.Properties.Name.value = name;
  }

  // Discriminator
  EntityType: EntityTypeEnum = EntityTypeEnum.Object;

  // Properties
  Properties: IProperties;

  // Fields
  Fields: IField[];

  // Fieldvalues
  FieldValues: {[fieldID: string]: any};
}
