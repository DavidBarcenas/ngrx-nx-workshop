import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ProductRating, Rating } from "@ngrx-nx-workshop/api-interfaces";
import { RatingService } from "./rating.service";
import { concatMap, switchMap } from "rxjs";

interface RatingsState {
  [productId: string]: Rating;
}

@Injectable({
  providedIn: 'root'
})
export class RatingStore extends ComponentStore<RatingsState> {
  constructor(private readonly ratingService: RatingService) {
    super({});
  }

  readonly  fetchRating = this.effect<string>(productId$ => {
    return productId$.pipe(
      switchMap(productId => this.ratingService.getRating(productId).pipe(
        tapResponse(productRating => this.patchState({
          [productId]: productRating?.rating
        }),
          e => console.log(e)
        )
      ))
    )
  })

  readonly setRating = this.effect<ProductRating>(productRating$ => {
    return productRating$.pipe(
      concatMap(({rating, productId}) =>
        this.ratingService.setRating({productId, rating}).pipe(
          tapResponse(
            () => this.patchState({[productId]: rating}),
            e => console.log(e)
          )
        )
      )
    )
  })

  readonly fetchAllRating = this.effect<void>(trigger$ => {
    return trigger$.pipe(
      switchMap(() => this.ratingService.getRatings().pipe(
        tapResponse(productRating =>
            this.patchState(productRating.reduce(
              (acc: {[productId: string]: Rating}, productRating) => {
                acc[productRating.productId] = productRating.rating;
                return acc
              }, {}
            )),
            e => console.log(e)
        ))
      ),
    )
  })

  selectRating(productId: string) {
    return this.select(state => state[productId])
  }
}
