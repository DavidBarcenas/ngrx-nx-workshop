import { Component, OnInit } from '@angular/core';
import { BasicProduct, Rating } from "@ngrx-nx-workshop/api-interfaces";
import { map, Observable, shareReplay } from 'rxjs';
import { RatingService } from '../rating.service';
import {Store} from "@ngrx/store";
import * as productListAction from './actions'
import * as selectors from '../selectors'
import { GlobalState } from "../product.reducer";

@Component({
  selector: 'ngrx-nx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$?: Observable<BasicProduct[] | undefined> = this.store.select(
    selectors.getProducts
  );
  customerRatings$?: Observable<{ [productId: string]: Rating }>;

  constructor(
    private readonly ratingService: RatingService,
    private readonly store: Store<GlobalState>
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
