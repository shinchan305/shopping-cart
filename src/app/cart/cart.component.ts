import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  faShoppingCart = faShoppingCart;

  constructor(private _sharedService: SharedService) { }

  items: any[] = [];

  ngOnInit(): void {
    this._sharedService.getCartItems().subscribe((cartItems: any[]) => {
      this.items = cartItems;
    })
  }

  getTotal() {
    if (!this.items.length) {
      return null;
    }
    return this.items.map(x => x.Count * x.Price).reduce((a, b) => a + b, 0);
  }

}
