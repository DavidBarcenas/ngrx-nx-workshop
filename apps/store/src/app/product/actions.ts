import { createAction, props } from "@ngrx/store";
import { BasicProduct, Product } from "@ngrx-nx-workshop/api-interfaces";

export const productsFetchedSuccess = createAction(
  '[Product API] products fetched success',
  props<{ products: BasicProduct[] }>()
)

export const productsFetchedError = createAction(
  '[Product API] products fetching error',
  props<{errorMessage: string}>()
)

export const singleProductFetchSuccess = createAction(
  '[Product API] single product fetched success,',
  props<{product: Product}>()
)

export const singleProductFetchedError = createAction(
  '[Product API] single product fetching error',
  props<{errorMessage: string}>()
)
