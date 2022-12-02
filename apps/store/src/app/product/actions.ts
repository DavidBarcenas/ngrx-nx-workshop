import { createAction, props } from "@ngrx/store";
import { BasicProduct } from "@ngrx-nx-workshop/api-interfaces";

export const productsFetched = createAction(
  '[Product API] Products fetched',
  props<{ products: BasicProduct[] }>()
)
