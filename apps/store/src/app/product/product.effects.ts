import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "./product.service";
import * as productListAction from './product-list/actions'
import * as apiActions from './actions'
import { catchError, exhaustMap, map, of } from "rxjs";

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
  ) {
  }

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productListAction.productsOpened),
      exhaustMap(() =>
        this.productService
          .getProducts()
          .pipe(
            map(products => apiActions.productsFetchedSuccess({ products })),
            catchError(() => of(apiActions.productsFetchedError({
              errorMessage: 'Error fetching products'
            })))
          )
      )
    )
  )
}