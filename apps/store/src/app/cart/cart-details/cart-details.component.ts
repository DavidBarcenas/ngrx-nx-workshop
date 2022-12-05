import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { filter, from, map, mergeMap, switchMap, toArray } from "rxjs";
import { CartProduct } from '../../model/product';
import { ProductService } from '../../product/product.service';
import { CartService } from '../cart.service';
import * as actions from './actions'
import { Store } from "@ngrx/store";
import { selectCartItems } from "../cart.selectors";

@Component({
  selector: 'ngrx-nx-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent {
  cartProducts$ = this.store.select(selectCartItems).pipe(
    filter(
      (cartItems): cartItems is NonNullable<typeof cartItems> => cartItems != null
    ),
    switchMap(cartItems => from(Object.keys(cartItems)).pipe(
      mergeMap(productId =>
        this.productService.getProduct(productId).pipe(
          map(product => ({
            ...product,
            quantity: cartItems[productId]
          }))
        )
      )
    )),
    toArray()
  )

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
    private readonly router: Router,
    private readonly store: Store
  ) {
    this.store.dispatch(actions.pageOpened())
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
          this.store.dispatch(actions.purchaseSuccess())
          this.router.navigateByUrl('');
        } else {
          this.snackBar.open('Purchase error', 'Error', {
            duration: 2500,
          });
        }
      });
  }
}
