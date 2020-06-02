import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private listeners = {};
  private events: BehaviorSubject<any>;

  constructor() {
  this.events = new BehaviorSubject<any>({});
  this.events.subscribe(({name, data}) => {
      if (this.listeners[name]) {
        for (const listener of this.listeners[name]) {
          listener(data);
        }
      }
    });
  }

  public on(name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(listener);
  }

  public broadcast(name, data) {
    this.events.next({name, data});
  }
}
