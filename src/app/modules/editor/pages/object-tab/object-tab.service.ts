import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {GameObject} from '../../../../data/schema/Classes/Editor/Objects/GameObject';
import {EditorService} from '../../services/editor.service';
import {EntityTypeEnum} from '../../../../data/schema/Classes/Storage/EntityTypeEnum';
import {GameObjectTemplate} from '../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';

@Injectable({
  providedIn: 'root'
})
export class ObjectTabService {

  constructor(private editorService: EditorService) {
    this.gameObjects = new BehaviorSubject<GameObject[]>([]);
    this.templatesEnum = new BehaviorSubject<{string, number}>(null);
    this.selectedObject = new BehaviorSubject<GameObject>(null);

    this.templatesSubscription = editorService.ObjectTemplates.subscribe(next => {
      this.objectTemplates = next;
    });

    this.objectSubscription = editorService.Objects.subscribe(next => {
      this.gameObjects.next(next);
      this.selectedObject.next(null);
    });
  }

  private objectSubscription: Subscription;
  private templatesSubscription: Subscription;

  private gameObjects: BehaviorSubject<GameObject[]>;
  private templatesEnum: BehaviorSubject<{}>;
  private selectedObject: BehaviorSubject<GameObject>;

  private objectTemplates: GameObjectTemplate[];

  private FindObjectByID(objectToFindID: number): GameObject {
    if (this.gameObjects.value.some(obj => obj.id === objectToFindID)) {
      return this.gameObjects.value.find(obj => obj.id === objectToFindID);
    }
  }

  public GetObjectsObservable() {
    return this.gameObjects.asObservable();
  }

  public GetTemplatesEnum() {
    return this.templatesEnum.asObservable();
  }

  public GetSelectedObjectObservable() {
    return this.selectedObject.asObservable();
  }

  public SelectObject(objectToSelectID: number) {
    this.selectedObject.next(this.FindObjectByID(objectToSelectID));
  }

  public UpdateTemplatesEnum() {
    this.TemplatesToEnum(this.objectTemplates);
  }

  public AddObject() {
    const newObject = new GameObject();
    newObject.id = this.editorService.GetNewID();
    this.gameObjects.value.push(newObject);
  }

  public CopyObject(objectToCopyID: number) {
    const objectToCopy: GameObject = this.FindObjectByID(objectToCopyID);

    const newObject: GameObject = new GameObject(objectToCopy);
    newObject.id = this.editorService.GetNewID();
    this.gameObjects.value.push(newObject);
  }

  public DeleteObject(objectToDeleteID: number) {
    if (this.selectedObject.value && objectToDeleteID === this.selectedObject.value.id) {
      this.selectedObject.next(null);
    }

    const currentObjects: GameObject[] = this.gameObjects.value
      .filter(obj => obj.id !== objectToDeleteID);

    this.editorService.UpdateLibrary(currentObjects, EntityTypeEnum.Object);
  }

  private TemplatesToEnum(templates: GameObjectTemplate[]) {
    const templateEnum = {};
    templates.forEach((template, index) => {
      if (typeof(templateEnum[template.Properties.Name.value]) === 'undefined') {
        templateEnum[template.Properties.Name.value] = template.id;
      } else {
        templateEnum[template.Properties.Name.value + '_' + index] = template.id;
      }
    });
    this.templatesEnum.next(templateEnum);
  }
}
