import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {GameObjectTemplate} from '../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {GameCharacterTemplate} from '../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {EditorService} from '../../services/editor/editor.service';
import {EntityTypeEnum} from '../../../../data/schema/Classes/Storage/EntityTypeEnum';
import {IProperties} from '../../../../data/schema/Interfaces/Editor/IProperty';

@Injectable({
  providedIn: 'root'
})
export class TemplateTabService {
  constructor(private editorService: EditorService) {
    this.characterTemplateObjects = new BehaviorSubject<GameCharacterTemplate[]>([]);
    this.objectTemplateObjects = new BehaviorSubject<GameObjectTemplate[]>([]);
    this.selectedObject = new BehaviorSubject<GameObjectTemplate|GameCharacterTemplate>(null);

    this.characterTemplateSubscription = editorService.CharacterTemplates.subscribe(next => {
      this.characterTemplateObjects.next(next);
      this.selectedObject.next(null);
    });
    this.objectTemplateSubscription = editorService.ObjectTemplates.subscribe(next => {
      this.objectTemplateObjects.next(next);
      this.selectedObject.next(null);
    });
  }

  private characterTemplateSubscription: Subscription;
  private objectTemplateSubscription: Subscription;

  private characterTemplateObjects: BehaviorSubject<GameCharacterTemplate[]>;
  private objectTemplateObjects: BehaviorSubject<GameObjectTemplate[]>;

  private selectedObject: BehaviorSubject<GameObjectTemplate|GameCharacterTemplate>;

  public SetParentTemplateID(properties: IProperties, parentTemplateID: number) {
    for (const key of Object.keys(properties)) {
      properties[key].parentTemplateID = parentTemplateID;
    }
  }

  public SetParentFieldID(properties: IProperties, parentFieldID: number) {
    for (const key of Object.keys(properties)) {
      properties[key].parentFieldID = parentFieldID;
    }
  }

  public FindTemplateByID(templateToFindID: number): GameObjectTemplate|GameCharacterTemplate {
    if (this.characterTemplateObjects.value.some(obj => obj.id === templateToFindID)) {
      return this.characterTemplateObjects.value.find(obj => obj.id === templateToFindID);
    } else if (this.objectTemplateObjects.value.some(obj => obj.id === templateToFindID)) {
      return this.objectTemplateObjects.value.find(obj => obj.id === templateToFindID);
    }

    return null;
  }

  public GetObjectTemplatesObservable() {
    return this.objectTemplateObjects.asObservable();
  }

  public GetCharacterTemplatesObservable() {
    return this.characterTemplateObjects.asObservable();
  }

  public GetSelectedObjectObservable() {
    return this.selectedObject.asObservable();
  }

  public SelectObject(templateToSelect: number) {
    this.selectedObject.next(this.FindTemplateByID(templateToSelect));
  }

  public AddCharacterTemplate() {
    const newCharacterTemplate: GameCharacterTemplate = new GameCharacterTemplate();
    newCharacterTemplate.id = this.editorService.GetNewID();
    this.SetParentTemplateID(newCharacterTemplate.Properties, newCharacterTemplate.id);
    this.characterTemplateObjects.value.push(newCharacterTemplate);
  }

  public AddObjectTemplate() {
    const newObjectTemplate: GameObjectTemplate = new GameObjectTemplate();
    newObjectTemplate.id = this.editorService.GetNewID();
    this.SetParentTemplateID(newObjectTemplate.Properties, newObjectTemplate.id);
    this.objectTemplateObjects.value.push(newObjectTemplate);
  }

  public CopyTemplate(templateToCopyID: number) {
    const templateToCopy: GameObjectTemplate|GameCharacterTemplate = this.FindTemplateByID(templateToCopyID);

    if (templateToCopy instanceof GameCharacterTemplate) {
      const newTemplate: GameCharacterTemplate = new GameCharacterTemplate(templateToCopy);
      newTemplate.id = this.editorService.GetNewID();
      this.SetParentTemplateID(newTemplate.Properties, newTemplate.id);
      this.characterTemplateObjects.value.push(newTemplate);
    } else {
      const newTemplate: GameObjectTemplate = new GameObjectTemplate(templateToCopy);
      newTemplate.id = this.editorService.GetNewID();
      this.SetParentTemplateID(newTemplate.Properties, newTemplate.id);
      this.objectTemplateObjects.value.push(newTemplate);
    }
  }

  public DeleteTemplate(templateToDeleteID: number) {
    if (this.selectedObject.value && templateToDeleteID === this.selectedObject.value.id) {
      this.selectedObject.next(null);
    }

    const templateToDelete: GameCharacterTemplate|GameObjectTemplate = this.FindTemplateByID(templateToDeleteID);

    if (templateToDelete.EntityType === EntityTypeEnum.CharacterTemplate) {
      const characterTemplates: GameCharacterTemplate[] = this.characterTemplateObjects.value;
      const indexOfTemplate: number = characterTemplates.indexOf(templateToDelete);
      characterTemplates.splice(indexOfTemplate, 1);
    } else if (templateToDelete.EntityType === EntityTypeEnum.ObjectTemplate) {
      const objectTemplates: GameObjectTemplate[] = this.objectTemplateObjects.value;
      const indexOfTemplate: number = objectTemplates.indexOf(templateToDelete);
      objectTemplates.splice(indexOfTemplate, 1);
    }
  }
}
