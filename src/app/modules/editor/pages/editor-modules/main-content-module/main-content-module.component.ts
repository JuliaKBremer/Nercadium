import {Component, Injectable, OnInit} from '@angular/core';
import {IOServiceService} from '../../../../../data/service/ioservice.service';

@Component({
  selector: 'app-main-content-module',
  templateUrl: './main-content-module.component.html',
  styleUrls: ['./main-content-module.component.css']
})
@Injectable()
export class MainContentModuleComponent implements OnInit {

  file = null;
  public Path: string;

  error: object = null;
  constructor(private dataHandler: IOServiceService) { }

  public GetTest(): void {
    this.dataHandler.getConfig(this.Path).subscribe(
      (data) => this.file = { ...data }, // success path
      error => this.error = error // error path
    );
  }

  public GetResult() {
    if (this.file != null) {
      const itm = this.file as testClass;
      return itm.Name;
    }
    return 'file empty / not found!';
  }

  public CreateFile() {
    const nitm = new testClass();
    nitm.Name = 'neu';
    this.dataHandler.writeTest(nitm, this.Path);
    this.file = nitm;
  }

  ngOnInit() {
  }

}
