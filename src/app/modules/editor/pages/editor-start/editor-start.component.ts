import {Component, OnDestroy, OnInit} from '@angular/core';
import {EditorService} from '../../services/editor.service';
import {Router} from '@angular/router';
import {AdventuresManagerService} from '../../../../core/service/adventures/adventures-manager.service';
import {Subscription} from 'rxjs';
import {NewAdventureService} from '../../../../core/service/adventures/new-adventure.service';

@Component({
  selector: 'app-editor-start',
  templateUrl: './editor-start.component.html',
  styleUrls: ['./editor-start.component.css']
})
export class EditorStartComponent implements OnInit, OnDestroy {

  public adventures: {id: string, path: string, name: string}[] = [];
  private adventuresSubscription: Subscription;

  public newOpen = true;

  constructor(private editorService: EditorService, private adventuresManagerService: AdventuresManagerService,
              public newAdventureService: NewAdventureService, private router: Router) { }

  ngOnInit() {
    this.adventuresManagerService.LoadAdventuresConfig();

    this.adventuresSubscription = this.adventuresManagerService.GetAdventuresObservable().subscribe(next => {
      if (next !== null) {
        const adventures = next.adventures;
        const adventuresArray: {id: string, path: string, name: string}[] = [];

        // tslint:disable-next-line:forin
        for (const adventureID in Object.keys(adventures)) {
          const adventurePathAndName: { path: string, name: string } = this.adventuresManagerService.GetAdventureByID(adventureID);

          // tslint:disable-next-line:max-line-length
          const adventureArrayObject: {id: string, path: string, name: string} = {id: adventureID, path: adventurePathAndName.path, name: adventurePathAndName.name};

          adventuresArray.push(adventureArrayObject);
        }

        if (adventuresArray.length > 0) {
          this.adventures = adventuresArray;
        } else {
          this.adventures = null;
        }
      }
    });
  }

  ngOnDestroy() {
    this.adventuresSubscription.unsubscribe();
  }

  public NewAdventure() {
    this.newOpen = !this.newOpen;

    this.newAdventureService.NewAdventure();
  }

  public CreateAdventure() {
    this.newAdventureService.CreateAdventure();

    this.router.navigate(['/editor/chapter']);
  }

  public OpenAdventureFromAdventureList(path: string, name: string) {
    this.editorService.LoadPackage(path, name);

    this.router.navigate(['/editor/chapter']);
  }

  public OpenAdventureByDialog() {
    const adventurePathName: {path: string, name: string} = this.adventuresManagerService.GetAdventureByDialog();

    this.editorService.LoadPackage(adventurePathName.path, adventurePathName.name);

    this.router.navigate(['/editor/chapter']);
  }
}
