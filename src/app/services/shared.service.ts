import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  itemsCount: BehaviorSubject<number> = new BehaviorSubject(0);
  searchText: BehaviorSubject<string> = new BehaviorSubject("");
  cartItems: BehaviorSubject<any[]> = new BehaviorSubject(new Array());

  updateItemsCount(updatedCount: number) {
    this.itemsCount.next(updatedCount);
  }

  getItemsCount() {
    return this.itemsCount.asObservable();
  }

  setSearchText(searchText: string) {
    this.searchText.next(searchText);
  }

  getSearchText() {
    return this.searchText.asObservable();
  }

  setCartItems(items: any[]) {
    this.cartItems.next(items);
  }

  getCartItems() {
    return this.cartItems.asObservable();
  }
}
