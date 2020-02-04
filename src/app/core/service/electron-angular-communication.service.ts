import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class ElectronAngularCommunicationService {

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

  public sendEvent(cannel: string, ...args) {
    this.ipc.send(cannel, args);
  }

  public invokeEvent(cannel: string, ...args): Promise<any> {
    return this.ipc.invoke(cannel, args);
  }
}
