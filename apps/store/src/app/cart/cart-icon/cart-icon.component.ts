import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import * as cartSelectors from '../cart.selectors';
import { Store } from "@ngrx/store";

@Component({
  selector: 'ngrx-nx-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss'],
})
export class CartIconComponent {
  cartItemsCounter$ = this.store.select(cartSelectors.selectCartItemsCount)

  constructor(
    private readonly cartService: CartService,
    private readonly store: Store
  ) {
    this.cartService.getCartProducts();
  }
}
