import {IBaseService} from '../IBaseService';
import {IBaseGameEntity} from '../../../../data/schema/Interfaces/Editor/IBaseGameEntity';
import {EditorService} from '../editor/editor.service';
import {SceneObject} from '../../../../data/schema/Classes/Editor/Scene/SceneObject';
import {PropertyTypes} from '../../../../data/schema/Enums/property-types.enum';

export class SceneService implements IBaseService {

  constructor(private editorService: EditorService) {
  }

  New(): IBaseGameEntity {
    const newScene: SceneObject = new SceneObject();

    newScene.id = this.editorService.GetNewID();
    newScene.Text = '';
    newScene.Properties = {
      Name: {id: 0, value: 'New Object', type: PropertyTypes.string}
    };

    this.editorService.libraryService.Add(newScene);
    return newScene;
  }

  Copy(sceneToCopy: SceneObject): IBaseGameEntity {
    const newScene: SceneObject = new SceneObject();

    newScene.id = this.editorService.GetNewID();
    newScene.Text = sceneToCopy.Text;
    newScene.Properties = JSON.parse(JSON.stringify(sceneToCopy.Properties));

    this.editorService.libraryService.Add(newScene);
    return newScene;
  }

  Delete(sceneToDelete: SceneObject) {
    this.editorService.libraryService.Remove(sceneToDelete);
  }
}
