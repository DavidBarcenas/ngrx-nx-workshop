import { createFeatureSelector, createSelector } from "@ngrx/store";
import { productAdapter, productFeatureKey, ProductState } from "./product.reducer";
import { selectRouterParam } from "../router/router.selectors";

const selectProductState = createFeatureSelector<ProductState>(productFeatureKey)

const selectProductsState = createSelector(
  selectProductState,
  state => state.products
)

const {selectAll, selectEntities} = productAdapter.getSelectors();

export const selectProducts = createSelector(selectProductsState, selectAll);
const selectProductsEntities = createSelector(
  selectProductsState,
  selectEntities
)

export const selectCurrentProductId = selectRouterParam('productId')

export const selectCurrentProduct = createSelector(
  selectProductsEntities,
  selectCurrentProductId,
  (products, id) => {
    if(id == null || !products) return undefined;
    return products[id]
  }
)

export const selectProductsCallState = createSelector(
  selectProductState,
  state => state.productsCallState
)
