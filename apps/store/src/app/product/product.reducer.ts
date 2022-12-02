import { Action, createReducer, on } from "@ngrx/store";
import { Product } from "@ngrx-nx-workshop/api-interfaces";
import * as productListAction from './product-list/actions'
import { data } from "@ngrx-nx-workshop/data";
interface ProductState {
  products?: Product[]
}
export const initialState: ProductState = {
  products: undefined
};

const productsReducer = createReducer(
  initialState,
  on(productListAction.productsOpened, state => ({
    products: [...data]
  }))
)

export function reducer(state: ProductState | undefined, action: Action) {
  return productsReducer(state, action)
}
