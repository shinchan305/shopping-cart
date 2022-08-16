import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list: any[] = [];
  filteredList: any[] = [];

  constructor(private _dataService: DataService, private _sharedService: SharedService) { }

  ngOnInit(): void {
    this.getList();

    this._sharedService.getSearchText().subscribe((searchText: string) => {
      this.search(searchText);
    });    
  }

  getList() {
    this._dataService.getItems().subscribe((response) => {
      console.log(response);
      this.list = <any[]>response;
      this.list.forEach(x => x['Count'] = 0);
      this._sharedService.getCartItems().subscribe((cartItems: any[]) => {
        if (cartItems && cartItems.length) {
          cartItems.forEach(x => {
            this.list.forEach(y => {
              if (x.Name === y.Name) {
                y.Count = x.Count;
              }
            })
          })
        }
        this.updatedFilteredList();
      });      
    }, err => {
      console.log(err);
    })
  }

  increaseItemCount(indexValue: number) {
    this.filteredList[indexValue]["Count"] = this.filteredList[indexValue]["Count"] + 1;
    this.updateCart();
  }

  decreaseItemCount(indexValue: number) {
    this.filteredList[indexValue]["Count"] = this.filteredList[indexValue]["Count"] - 1;
    this.updateCart();
  }

  updateCart(index?: number, value?: number) {
    if (!value && index !== undefined && index !== null) {
      this.filteredList[index].Count = 0;
    }
    this._sharedService.updateItemsCount(this.filteredList.map(x => parseInt(x.Count)).reduce((a, b) => a + b, 0));
    this._sharedService.setCartItems(this.filteredList.filter(x => x.Count > 0));
  }

  search(searchText: string) {
    if (!searchText || searchText === '') {
      this.updatedFilteredList();
    }
    else {
      this.filteredList = this.list.filter(x => x.Name.toLowerCase().startsWith(searchText.toLowerCase()));
    }
  }

  updatedFilteredList() {
    this.filteredList = JSON.parse(JSON.stringify(this.list));
  }

}
