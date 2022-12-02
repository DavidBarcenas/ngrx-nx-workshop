import { Action, createReducer, on } from "@ngrx/store";
import { Product } from "@ngrx-nx-workshop/api-interfaces";
import * as apiActions from './actions'
interface ProductState {
  products?: Product[]
}
export const initialState: ProductState = {
  products: undefined
};

const productsReducer = createReducer(
  initialState,
  on(apiActions.productsFetchedSuccess, (state, { products }) => {
    return {
      products: [...products]
    }
  })
)

export function reducer(state: ProductState | undefined, action: Action) {
  return productsReducer(state, action)
}
