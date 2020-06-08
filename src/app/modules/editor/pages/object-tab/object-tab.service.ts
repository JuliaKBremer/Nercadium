import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {GameObject} from '../../../../data/schema/Classes/Editor/Objects/GameObject';
import {EditorService} from '../../services/editor/editor.service';
import {GameObjectTemplate} from '../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {EventService} from '../../../../core/service/event/event.service';
import {IProperties} from '../../../../data/schema/Interfaces/Editor/IProperty';
import {TemplateTabService} from '../template-tab/template-tab.service';
import {IField} from '../../../../data/schema/Interfaces/Editor/IField';

@Injectable({
  providedIn: 'root'
})
export class ObjectTabService {

  constructor(private editorService: EditorService, private eventService: EventService, private templateTabService: TemplateTabService) {
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

    // Init events
    eventService.on('Change-Template', () => {
      this.SelectObject(this.selectedObject.value.id);
    });
  }

  private objectSubscription: Subscription;
  private templatesSubscription: Subscription;

  private gameObjects: BehaviorSubject<GameObject[]>;
  private templatesEnum: BehaviorSubject<{}>;
  private selectedObject: BehaviorSubject<GameObject>;

  private objectTemplates: GameObjectTemplate[];

  private static SetParentObjectID(properties: IProperties, parentObjectID: number) {
    for (const key of Object.keys(properties)) {
      properties[key].parentObjectID = parentObjectID;
    }
  }

  public FindObjectByID(objectToFindID: number): GameObject {
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
    this.UpdateFieldValue();
  }

  public UpdateTemplatesEnum() {
    this.TemplatesToEnum(this.objectTemplates);
  }

  public AddObject() {
    const newObject = new GameObject();
    newObject.id = this.editorService.GetNewID();
    ObjectTabService.SetParentObjectID(newObject.Properties, newObject.id);
    this.gameObjects.value.push(newObject);
  }

  public CopyObject(objectToCopyID: number) {
    const objectToCopy: GameObject = this.FindObjectByID(objectToCopyID);

    const newObject: GameObject = new GameObject(objectToCopy);
    newObject.id = this.editorService.GetNewID();
    ObjectTabService.SetParentObjectID(newObject.Properties, newObject.id);
    this.gameObjects.value.push(newObject);
  }

  public DeleteObject(objectToDeleteID: number) {
    if (this.selectedObject.value && objectToDeleteID === this.selectedObject.value.id) {
      this.selectedObject.next(null);
    }

    const objectToDelete: GameObject = this.FindObjectByID(objectToDeleteID);
    const objects: GameObject[] = this.gameObjects.value;
    const indexOfObject: number = objects.indexOf(objectToDelete);
    objects.splice(indexOfObject, 1);
  }

  public UpdateFieldValue() {
    const object: GameObject = this.selectedObject.value;
    let template: GameObjectTemplate = null;

    if (object) {
      template = this.templateTabService.FindTemplateByID(object.Properties.Template.value);
    }

    if (object && template) {
      this.CheckFieldValue(object, template);
    }
  }

  private CheckFieldValue(gameObject: GameObject, template: GameObjectTemplate) {
    for (const fieldValuesKeyTemplate of Object.keys(template.FieldValues)) {
      const field: IField = template.Fields.filter(obj => obj.ID.toString() === fieldValuesKeyTemplate)[0];

      if (!(fieldValuesKeyTemplate in gameObject.FieldValues)) {
        gameObject.FieldValues[fieldValuesKeyTemplate] = template.FieldValues[fieldValuesKeyTemplate];
        gameObject.FieldTypes[fieldValuesKeyTemplate] = field.Properties.Type.value;
      } else {
        if (gameObject.FieldTypes[fieldValuesKeyTemplate] !== field.Properties.Type.value) {
          gameObject.FieldValues[fieldValuesKeyTemplate] = template.FieldValues[fieldValuesKeyTemplate];
          gameObject.FieldTypes[fieldValuesKeyTemplate] = field.Properties.Type.value;
        }
      }
    }

    for (const fieldValuesKeyObject of Object.keys(gameObject.FieldValues)) {
      if (!(fieldValuesKeyObject in template.FieldValues)) {
        delete gameObject.FieldValues[fieldValuesKeyObject];
        delete gameObject.FieldTypes[fieldValuesKeyObject];
      }
    }
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
