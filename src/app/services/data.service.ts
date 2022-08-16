import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _httpClient: HttpClient) {
  }

  getItems() {
    return this._httpClient.get("../assets/data/list.json");
  }
}
