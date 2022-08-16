import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  faSearch = faSearch;
  itemsCount: number = 0;
  searchText: string = '';
  constructor(private _sharedService: SharedService) { }

  ngOnInit(): void {
    this._sharedService.getItemsCount().subscribe(updatedCount => {
      this.itemsCount = updatedCount;
    })
  }

  search(searchText: string) {
    this._sharedService.setSearchText(searchText);
  }

}
