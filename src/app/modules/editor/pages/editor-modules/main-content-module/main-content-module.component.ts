import {Component, Injectable, OnInit} from '@angular/core';
import {LibraryService} from '../../../../../core/service/localLibrary/library.service';
import {GameObject} from '../../../../../data/schema/Classes/Editor/Objects/GameObject';
import {GameObjectTemplate} from '../../../../../data/schema/Classes/Editor/Templates/GameObjectTemplate';
import {PAFHandler} from '../../../../../data/schema/Classes/Storage/PAFHandler';
import {StorageSystemService} from '../../../../../core/service/storageSystem/storage-system.service';
import {IBaseGameEntity} from '../../../../../data/schema/Interfaces/Editor/IBaseGameEntity';

@Component({
  selector: 'app-main-content-module',
  templateUrl: './main-content-module.component.html',
  styleUrls: ['./main-content-module.component.css']
})
@Injectable()
export class MainContentModuleComponent implements OnInit {


  constructor(private libraryService: LibraryService, private fileManager: StorageSystemService) { }

  private result: string = null;
  public FilePath = '/users/mdmm/';
  private itm: IBaseGameEntity[];

  public GetTest(): void {
    return;
  }

  public GetResult() {
    return this.result;
  }

  public CreateFile() {
    this.result = 'working';
    const itms: IBaseGameEntity[] = [];
    const objTest = new GameObject();
    const objTemp = new GameObjectTemplate();
    objTemp.Name = 'TesTemplate';
    objTemp.Properties = null;

    objTest.Name = 'Test';
    objTest.ObjectTemplate = objTemp;
    this.libraryService.AddGameObject(objTest);
    this.libraryService.SavePackage(this.FilePath, 'TestPackage.json');
  }

  ngOnInit() {
  }

}
