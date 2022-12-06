import { Component } from '@angular/core';
import { Rating } from "@ngrx-nx-workshop/api-interfaces";
import { Observable } from 'rxjs';
import { createSelector, Store } from "@ngrx/store";
import * as productListAction from './actions'
import { selectProducts, selectProductsCallState } from "../product.selectors";
import { LoadingState } from '../../shared/call-state';
import { RatingStore } from "../rating.store";

const productListVm = createSelector(
  selectProducts,
  selectProductsCallState,
  (products, productsCallState) => ({products, productsCallState})
)

@Component({
  selector: 'ngrx-nx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  productListVm$ = this.store.select(productListVm)
  customerRatings$?: Observable<{ [productId: string]: Rating }> =
    this.ratingStore.state$;

  // Make LoadingState be available in the template.
  readonly LoadingState = LoadingState;

  constructor(
    private readonly store: Store,
    private readonly ratingStore: RatingStore
  ) {
    this.ratingStore.fetchAllRating()
    this.store.dispatch(productListAction.productsOpened())
  }
}
