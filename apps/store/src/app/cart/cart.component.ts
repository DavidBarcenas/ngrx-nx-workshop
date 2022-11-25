import { Component } from '@angular/core';
import { map } from 'rxjs';
import { CartService } from './cart.service';

@Component({
  selector: 'ngrx-nx-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  cartItemsCounter$ = this.cartService.cartItems$.pipe(
    map((cartItems) =>
      cartItems.reduce((acc, { quantity }) => acc + quantity, 0)
    )
  );

  constructor(private readonly cartService: CartService) {
    this.cartService.getCartProducts();
  }
}
