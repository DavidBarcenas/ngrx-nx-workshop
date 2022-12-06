import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { CartProduct } from '../../model/product';
import * as actions from './actions'
import { createSelector, Store } from "@ngrx/store";
import { selectCartProducts, selectCartTotal } from "../cart.selectors";

export const cartDetailsVm = createSelector(
  selectCartProducts,
  selectCartTotal,
  (products, total) => ({products, total})
)

@Component({
  selector: 'ngrx-nx-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss'],
})
export class CartDetailsComponent {
  cartDetailsVm$: Observable<{
    products?: CartProduct[];
    total?: number;
  }> = this.store.select(cartDetailsVm);

  constructor(private readonly store: Store) {
    this.store.dispatch(actions.pageOpened());
  }

  removeOne(productId: string) {
    this.store.dispatch(actions.removeProductClicked({ productId }));
  }

  removeAll() {
    this.store.dispatch(actions.removeAllProductsClicked());
  }

  purchase(cartProducts: CartProduct[]) {
    this.store.dispatch(actions.purchaseClicked({ cartProducts }));
  }
}
