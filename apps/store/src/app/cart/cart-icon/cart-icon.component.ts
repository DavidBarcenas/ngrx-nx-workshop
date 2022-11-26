import { Component } from '@angular/core';
import { map } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'ngrx-nx-cart-icon',
  templateUrl: './cart-icon.component.html',
  styleUrls: ['./cart-icon.component.scss'],
})
export class CartIconComponent {
  cartItemsCounter$ = this.cartService.cartItems$.pipe(
    map((cartItems) =>
      cartItems.reduce((acc, { quantity }) => acc + quantity, 0)
    )
  );

  constructor(private readonly cartService: CartService) {
    this.cartService.getCartProducts();
  }
}
