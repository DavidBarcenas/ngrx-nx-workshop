import { createReducer, on } from "@ngrx/store";
import * as apiActions from './actions'
import { ProductModel } from "../model/product";

export const productFeatureKey = 'product'

export interface GlobalState {
  product: ProductState;
}
export interface ProductState {
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
  })),
  on(apiActions.singleProductFetchSuccess, (state, {product}) => {
    const productsClone = state.products ? [...state.products] : []
    const indexOfProduct = productsClone.findIndex(p => p.id === product.id)
    // Remove old one and replace with single product fetch,
    if(indexOfProduct < 0) {
      productsClone.push(product)
    } else {
      productsClone.splice(indexOfProduct, 1, product)
    }
    return {
      ...state,
      products: productsClone
    }
  })
)
