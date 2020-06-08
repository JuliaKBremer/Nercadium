import {IBaseGameEntity} from '../../../data/schema/Interfaces/Editor/IBaseGameEntity';

export interface IBaseService {
  // Create new BaseEntity
  New(): IBaseGameEntity;

  // Delete BaseEntity
  Delete(objectToDelete: any);

  // Copy BaseEntity
  Copy(objectToCopy: any): IBaseGameEntity;
}
