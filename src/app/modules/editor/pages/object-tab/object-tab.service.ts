import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {GameObject} from '../../../../data/schema/Classes/Editor/Objects/GameObject';
import {EditorService} from '../../services/editor.service';
import {EntityTypeEnum} from '../../../../data/schema/Classes/Storage/EntityTypeEnum';

@Injectable({
  providedIn: 'root'
})
export class ObjectTabService {

  constructor(private editorService: EditorService) {
    this.objectObjects = new BehaviorSubject<GameObject[]>([]);
    this.selectedObject = new BehaviorSubject<GameObject>(null);

    this.objectSubscription = editorService.Objects.subscribe(next => {
      this.objectObjects.next(next);
      this.selectedObject.next(null);
    });
  }

  private objectSubscription: Subscription;

  private objectObjects: BehaviorSubject<GameObject[]>;

  private selectedObject: BehaviorSubject<GameObject>;

  private FindObjectByID(objectToFindID: number): GameObject {
    if (this.objectObjects.value.some(obj => obj.id === objectToFindID)) {
      return this.objectObjects.value.find(obj => obj.id === objectToFindID);
    }
  }

  public GetObjectsObservable() {
    return this.objectObjects.asObservable();
  }

  public GetSelectedObjectObservable() {
    return this.selectedObject.asObservable();
  }

  public SelectObject(objectToSelectID: number) {
    this.selectedObject.next(this.FindObjectByID(objectToSelectID));
  }

  public AddObject() {
    const newObject = new GameObject();
    newObject.id = this.editorService.GetNewID();
    this.objectObjects.value.push(newObject);
  }

  public CopyObject(objectToCopyID: number) {
    const objectToCopy: GameObject = this.FindObjectByID(objectToCopyID);

    const newObject: GameObject = new GameObject(objectToCopy);
    newObject.id = this.editorService.GetNewID();
    this.objectObjects.value.push(newObject);
  }

  public DeleteObject(objectToDeleteID: number) {
    if (this.selectedObject.value && objectToDeleteID === this.selectedObject.value.id) {
      this.selectedObject.next(null);
    }

    const currentObjects: GameObject[] = this.objectObjects.value
      .filter(obj => obj.id !== objectToDeleteID);

    this.editorService.UpdateLibrary(currentObjects, EntityTypeEnum.Object);
  }
}
