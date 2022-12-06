import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Rating, Review } from "@ngrx-nx-workshop/api-interfaces";
import { Store } from "@ngrx/store";
import { RatingService } from "../rating.service";
import * as actions from './actions';
import { selectCurrentProduct, selectCurrentProductId } from "../product.selectors";
import { filter, switchMap, tap } from "rxjs";
import { concatLatestFrom } from "@ngrx/effects";
import { RatingStore } from "../rating.store";

interface ProductDetailsState {
  reviews?: Review[];
}

@Injectable()
export class ProductDetailsStore extends ComponentStore<ProductDetailsState> {
  constructor(
    private readonly store: Store,
    private readonly ratingService: RatingService,
    private readonly ratingStore: RatingStore,
  ) {
    super({});
    this.store.dispatch(actions.productDetailsOpened())

    // This re-fetches reviews whenever productId changes.
    this.fetchReviews(this.productId$);
    this.ratingStore.fetchRating(this.productId$)
  }

  private readonly productId$ = this.store
    .select(selectCurrentProductId)
    .pipe(filter((id): id is string => id != null));

  readonly vm$ = this.select(
    this.state$,
    this.store.select(selectCurrentProduct),
    this.productId$.pipe(
      switchMap(productId => this.ratingStore.selectRating(productId))
    ),
    ({reviews}, product, rating) => ({reviews, rating, product})
  );

  readonly setRating = this.effect<Rating>((rating$) => {
    return rating$.pipe(
      concatLatestFrom(() => this.productId$),
      tap(([rating, productId]) => {
        this.ratingStore.setRating({rating, productId})
      })
    );
  });

  readonly postReview = this.effect<{ reviewer: string; reviewText: string }>(
    (review$) => {
      return review$.pipe(
        concatLatestFrom(() => this.productId$),
        switchMap(([review, productId]) =>
          this.ratingService.postReview({ productId, ...review }).pipe(
            tapResponse(
              () => this.fetchReviews(productId),
              (e) => console.log(e)
            )
          )
        )
      );
    }
  );

  readonly fetchReviews = this.effect<string>((productId$) => {
    return productId$.pipe(
      switchMap((productId) =>
        this.ratingService.getReviews(productId).pipe(
          tapResponse(
            (reviews) => this.patchState({ reviews }),
            (e) => console.log(e)
          )
        )
      )
    );
  });

  addToCart(productId: string) {
    this.store.dispatch(actions.addToCart({ productId }));
  }
}
