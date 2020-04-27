import {Component, Injectable, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {LibraryService} from '../../../../../core/service/localLibrary/library.service';
import {GameObject} from '../../../../../data/schema/Classes/Editor/Objects/GameObject';
import {GameObjectTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {StorageSystemService} from '../../../../../core/service/storageSystem/storage-system.service';
import {IBaseGameEntity} from '../../../../../data/schema/Interfaces/Editor/IBaseGameEntity';
import {GameCharacterTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameCharacterTemplate';
import {EntityTypeEnum} from '../../../../../data/schema/Classes/Storage/EntityTypeEnum';
import {StateEnum} from '../../../../../data/schema/Classes/Storage/StateEnum';

@Component({
  selector: 'app-main-content-module',
  templateUrl: './main-content-module.component.html',
  styleUrls: ['./main-content-module.component.css']
})
@Injectable()
export class MainContentModuleComponent implements OnInit, OnDestroy {

  @Input() selectedTemplateObservable: Observable<GameObjectTemplate|GameCharacterTemplate>;

  public selectedObject: GameObjectTemplate|GameCharacterTemplate;
  public entityTypes = EntityTypeEnum;

  private selectedObjectSubscription: Subscription;

  constructor(private libraryService: LibraryService, private fileManager: StorageSystemService) { }

  private result: string = null;
  public input = '';
  public FilePath = '/users/mdmm/';
  private itm: IBaseGameEntity;
  index: number;

  public Load(): void {
    const result = this.libraryService.LoadPackage(this.FilePath, 'TestPackage');
    if (result === StateEnum.Loading) {
      this.result = 'Loading';
    }
    if (result !== StateEnum.Loading) {
      this.result = 'Loaded!';
    }
  }

  public DatabaseItems() {
    return this.libraryService.GetLoadedObjects();
  }

  public GetResult() {
    return this.result;
  }

  public Delete() {
    const objTest = new GameObject();
    objTest.Name = this.input;
    this.libraryService.Remove(objTest);
    const index = this.libraryService.FindIndexByName(this.input, EntityTypeEnum.Object);

    if (index > -1) {
      const fitm = this.libraryService.GetEntityByIndex(index, EntityTypeEnum.Object);
      if (fitm != null) {
        this.libraryService.Remove(fitm);
      }
    }
  }

  public CreateFile() {
    this.result = 'working';
    // this.libraryService.Remove(objTest2);
    this.libraryService.SavePackage(this.FilePath, 'TestPackage');
    this.result = 'done';
  }

  public Add() {
    const objTest = new GameObject();
    objTest.Name = this.input;
    this.libraryService.Add(objTest);
  }

  public Modify() {
    const objTest = new GameObject();
    objTest.Name = this.input;

    if (this.index > -1) {
      this.libraryService.Replace(this.index, objTest);
    }
  }

  ngOnInit() {
    if (this.selectedTemplateObservable !== undefined) {
      this.selectedObjectSubscription = this.selectedTemplateObservable.subscribe(next => {
        this.selectedObject = next;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.selectedObjectSubscription) {
      this.selectedObjectSubscription.unsubscribe();
    }
  }
}
