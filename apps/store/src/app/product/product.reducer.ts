import { Action } from "@ngrx/store";
import { Product } from "@ngrx-nx-workshop/api-interfaces";
import { data } from "@ngrx-nx-workshop/data";

interface ProductState {
  products: Product[]
}

export const initialState: ProductState = {
  products: data
};

export function productsReducer(
  state: ProductState = initialState,
  action: Action
): ProductState {
  return state
}
