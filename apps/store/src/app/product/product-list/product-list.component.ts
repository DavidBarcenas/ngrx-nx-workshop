import { Component, OnInit } from '@angular/core';
import { BasicProduct, Rating } from "@ngrx-nx-workshop/api-interfaces";
import { map, Observable, shareReplay } from 'rxjs';
import { RatingService } from '../rating.service';
import { createSelector, Store } from "@ngrx/store";
import * as productListAction from './actions'
import { selectProducts, selectProductsCallState } from "../product.selectors";
import { LoadingState } from '../../shared/call-state';

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
export class ProductListComponent implements OnInit {
  productListVm$ = this.store.select(productListVm)
  customerRatings$?: Observable<{ [productId: string]: Rating }>;

  // Make LoadingState be available in the template.
  readonly LoadingState = LoadingState;

  constructor(
    private readonly ratingService: RatingService,
    private readonly store: Store
  ) {
    this.store.dispatch(productListAction.productsOpened())
  }

  ngOnInit(): void {
    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map((ratingsArray) =>
        // Convert from Array to Indexable.
        ratingsArray.reduce(
          (acc: { [productId: string]: Rating }, ratingItem) => {
            acc[ratingItem.productId] = ratingItem.rating;
            return acc;
          },
          {}
        )
      ),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
  }
}
