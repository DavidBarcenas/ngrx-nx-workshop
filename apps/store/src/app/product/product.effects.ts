import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "./product.service";
import * as productListActions from './product-list/actions'
import * as productDetailsActions from './product-details/actions'
import * as apiActions from './actions'
import { catchError, exhaustMap, filter, map, of, switchMap } from "rxjs";
import { Store } from "@ngrx/store";
import { selectCurrentProductId } from "./product.selectors";

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly productService: ProductService,
    private readonly store: Store
  ) { }

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productListActions.productsOpened),
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

  fetchCurrentProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productDetailsActions.productDetailsOpened),
      concatLatestFrom(() =>
        this.store
          .select(selectCurrentProductId)
          .pipe(filter((id): id is string => id != null))
      ),
      switchMap(([, id]) =>
        this.productService.getProduct(id).pipe(
          map(product => apiActions.singleProductFetchSuccess({product})),
          catchError(() => of(apiActions.singleProductFetchedError({
            errorMessage: 'Error fetching single product'
          })))
        )
      )
    )
  })
}
