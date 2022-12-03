import { Action, createReducer, on } from "@ngrx/store";
import * as apiActions from './actions'
import { ProductModel } from "../model/product";

export interface GlobalState {
  product: ProductState;
}
interface ProductState {
  products?: ProductModel[];
}
export const initialState: ProductState = {
  products: undefined
};

export const productsReducer = createReducer(
  initialState,
  on(apiActions.productsFetchedSuccess, (state, { products }) => ({
    ...state,
    products: [...products]
  })),
  on(apiActions.productsFetchedError, (state) => ({
    ...state,
    products: []
  }))
)
