import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class MinMaxCloseService {

  private ipc: IpcRenderer;
  constructor() {
    if ((window as any).require) {
      try {
        this.ipc = (window as any).require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron ipc');
    }
  }

  public CloseWindow() {
    console.log('close');
    this.ipc.send('close-window');
  }

  public MinimizeWindow() {
    console.log('minimize');
    this.ipc.send('minimize-window');
  }

  public MaximizeWindow() {
    console.log('maximize');
    this.ipc.send('maximize-window');
  }

  public UnmaximizeWindow() {
    console.log('unmaximize');
    this.ipc.send('unmaximize-window');
  }
}
