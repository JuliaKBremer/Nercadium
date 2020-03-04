import {Component, Injectable, Input, OnInit} from '@angular/core';
import {ITemplate} from '../../../../../data/schema/Interfaces/Editor/ITemplate';

@Component({
  selector: 'app-main-content-module',
  templateUrl: './main-content-module.component.html',
  styleUrls: ['./main-content-module.component.css']
})
@Injectable()
export class MainContentModuleComponent implements OnInit {

  @Input() selectedTemplate: ITemplate;
  @Input() templates: ITemplate[];

  constructor() { }

  ngOnInit() {
  }

}
