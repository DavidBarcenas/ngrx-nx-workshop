import { createReducer, on } from "@ngrx/store";
import * as apiActions from './actions'
import { ProductModel } from "../model/product";
import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";

export const productFeatureKey = 'product'

export interface ProductState {
  products: EntityState<ProductModel>;
}

// If your entity's id property is different you can specify it during
// entity adapter creation.
export const productAdapter: EntityAdapter<ProductModel> = createEntityAdapter()

export const initialState: ProductState = {
  products: productAdapter.getInitialState()
};

export const productsReducer = createReducer(
  initialState,
  on(apiActions.productsFetchedSuccess, (state, { products }) => ({
    ...state,
    products: productAdapter.upsertMany(products, state.products)
  })),
  on(apiActions.singleProductFetchSuccess, (state, {product}) => ({
    ...state,
    products: productAdapter.upsertOne(product, state.products)
  })),
)
