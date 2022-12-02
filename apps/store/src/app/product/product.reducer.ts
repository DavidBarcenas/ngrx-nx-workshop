import { Action } from "@ngrx/store";
import { Product } from "@ngrx-nx-workshop/api-interfaces";
interface ProductState {
  products?: Product[]
}
export const initialState: ProductState = {
  products: undefined
};
export function productsReducer(
  state: ProductState = initialState,
  action: Action
): ProductState {
  return state
}
