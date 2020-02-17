import { Injectable } from '@angular/core';
import {AdventureObject} from '../Classes/Editor/Adventure/AdventureObject';
import {GameObject} from '../Classes/Editor/Objects/GameObject';
import {SceneObject} from '../Classes/Editor/Scene/SceneObject';
import {GameScript} from '../Classes/Editor/Scripts/GameScript';
import {CharacterObject} from '../Classes/Editor/Character/CharacterObject';

@Injectable({
  providedIn: 'root'
})
export class DBLocalServiceService {

  Adventures: AdventureObject[];
  Characters: CharacterObject[];
  Objects: GameObject[];
  Scenes: SceneObject[];
  Scripts: GameScript[];

  constructor() { }
}
