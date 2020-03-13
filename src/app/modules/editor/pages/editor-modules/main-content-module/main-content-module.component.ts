import {Component, Injectable, Input, OnInit, OnDestroy} from '@angular/core';
import {Observable, Subscription} from 'rxjs';import {LibraryService} from '../../../../../core/service/localLibrary/library.service';
import {GameObject} from '../../../../../data/schema/Classes/Editor/Objects/GameObject';
import {GameObjectTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {StorageSystemService} from '../../../../../core/service/storageSystem/storage-system.service';
import {IBaseGameEntity} from '../../../../../data/schema/Interfaces/Editor/IBaseGameEntity';
import {GameChapter} from '../../../../../data/schema/Classes/Editor/Chapter/GameChapter';
import {GameScript} from '../../../../../data/schema/Classes/Editor/Scripts/GameScript';
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
  public FilePath = '/users/mdmm/';
  private itm: IBaseGameEntity[];

  public Load(): void {
    const result = this.libraryService.LoadPackage(this.FilePath, 'TestPackage');
    if (result === StateEnum.Loading) {
      this.result = 'Loading';
    }
    if (result !== StateEnum.Loading) {
      this.result = 'Loaded!';
    }
  }

  public GetResult() {
    return this.result;
  }

  public CreateFile() {
    this.result = 'working';
    const itms: IBaseGameEntity[] = [];
    const anderes = new GameChapter();
    anderes.Name = 'Test Kapitel der mega krassen Sorte !';
    anderes.Description = 'joa  ne, weißt schon...';
    const objTest = new GameObject();
    const objTemp = new GameObjectTemplate();
    objTemp.Name = 'TesTemplate';
    objTemp.Properties = null ;

    const script = new GameScript ();
    script.Name = 'Son Skipt halt...';
    script.Description = 'Bla bla ein skipt mit Text usw usw usw usw usw usw usw';

    objTest.Name = 'Test';
    objTest.ObjectTemplate = objTemp;
    this.libraryService.Add(objTest);
    this.libraryService.Add(anderes);
    this.libraryService.Add(script);
    this.libraryService.SavePackage(this.FilePath, 'TestPackage');
    this.result = 'done';
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
