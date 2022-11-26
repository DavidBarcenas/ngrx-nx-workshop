import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { from, map, mergeMap, switchMap, toArray } from 'rxjs';
import { CartProduct } from '../../model/product';
import { CartService } from '../cart.service';

@Component({
  selector: 'ngrx-nx-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent {
  cartProducts$ = this.cartService.cartItems$.pipe(
    switchMap((cartItems) =>
      from(cartItems).pipe(
        mergeMap((item) =>
          this.productService
            .getProduct(item.productId)
            .pipe(map((product) => ({ ...product, quantity: item.quantity })))
        ),
        toArray()
      )
    )
  );

  total$ = this.cartProducts$.pipe(
    map(
      (cartProducts) =>
        cartProducts &&
        cartProducts.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        )
    )
  );

  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.cartService.getCartProducts();
  }

  removeOne(id: string) {
    this.cartService.removeProduct(id);
  }

  removeAll() {
    this.cartService.removeAll();
  }

  purchase(products: CartProduct[]) {
    this.cartService
      .purchase(
        products.map(({ id, quantity }) => ({ productId: id, quantity }))
      )
      .subscribe((isSuccess) => {
        if (isSuccess) {
          this.cartService.getCartProducts();
          this.router.navigateByUrl('');
        } else {
          this.snackBar.open('Purchase error', 'Error', {
            duration: 2500,
          });
        }
      });
  }
}
