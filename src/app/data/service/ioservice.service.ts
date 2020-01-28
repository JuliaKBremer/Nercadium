import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IOServiceService {
  constructor(private http: HttpClient) { }
  public getConfig(configURL: string) {
    return this.http.get(configURL);
  }

  public writeTest(obj: object, path: string) {
  }


}
