import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { MatSnackBar } from "@angular/material/snack-bar";
import * as productApiAction from './product/actions'
import { tap } from "rxjs";

@Injectable()
export class ErrorEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly snackBar: MatSnackBar
  ) {}

  handleFetchError$ = createEffect(
    () => this.actions$.pipe(
      ofType(productApiAction.productsFetchedError),
      tap(({errorMessage}) => {
        this.snackBar.open(errorMessage, 'Error', {
          duration: 2500
        })
      })
    ),
    {dispatch: false}
  )
}
