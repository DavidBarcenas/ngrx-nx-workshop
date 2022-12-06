import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as productApiActions from './product/actions'
import * as cartApiActions from './cart/actions'
import { tap } from "rxjs";

@Injectable()
export class ErrorEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly snackBar: MatSnackBar
  ) {}

  handleFetchError$ = createEffect(
    () => this.actions$.pipe(
      ofType(
        productApiActions.productsFetchedError,
        productApiActions.singleProductFetchedError,
        cartApiActions.fetchCartItemsError,
        cartApiActions.addToCartError,
        cartApiActions.purchaseError,
        cartApiActions.removeAllFromCartError,
        cartApiActions.removeSingleFromCartError
      ),
      tap(({errorMessage}) => {
        this.snackBar.open(errorMessage, 'Error', {
          duration: 2500
        })
      })
    ),
    {dispatch: false}
  )
}
