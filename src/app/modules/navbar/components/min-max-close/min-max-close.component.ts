import { Component, OnInit } from '@angular/core';
import { MinMaxCloseService } from './min-max-close.service';

@Component({
  selector: 'app-min-max-close',
  templateUrl: './min-max-close.component.html',
  styleUrls: ['./min-max-close.component.css']
})
export class MinMaxCloseComponent implements OnInit {

  constructor(private mmcService: MinMaxCloseService) { }

  isMaximized = false;

  ngOnInit() {
  }

  public CloseWindow() {
    this.mmcService.CloseWindow();
  }

  public MinimizeWindow() {
    this.mmcService.MinimizeWindow();
    this.isMaximized = false;
  }

  public MaximizeWindow() {
    this.mmcService.MaximizeWindow();
    this.isMaximized = true;
  }

  public UnmaximizeWindow() {
    this.mmcService.UnmaximizeWindow();
    this.isMaximized = false;
  }
}
