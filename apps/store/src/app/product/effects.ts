import { ApplicationRef, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "./product.service";
import * as productListAction from './product-list/actions'
import * as apiActions from './actions'
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ProductEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly snackBar: MatSnackBar,
    private readonly appRef: ApplicationRef
  ) {}
  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productListAction.productsOpened),
      exhaustMap(() =>
        this.productService
          .getProducts()
          .pipe(
            map(products => apiActions.productsFetchedSuccess({ products })),
            catchError(() => of(apiActions.productsFetchedError()))
          )
      )
    )
  )

  handleFetchError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(apiActions.productsFetchedError),
      tap(() => {
        this.snackBar.open('Error fetching products', 'Error', {
          duration: 2500
        })
        // Triggers change detection
        this.appRef.tick();
      })
    ),
  {dispatch: false}
  )
}
