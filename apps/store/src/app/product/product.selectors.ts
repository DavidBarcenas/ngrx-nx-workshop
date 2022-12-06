import { createFeatureSelector, createSelector } from "@ngrx/store";
import { productFeatureKey, ProductState } from "./product.reducer";
import { selectRouterParam } from "../router/router.selectors";

const selectProductState = createFeatureSelector<ProductState>(productFeatureKey)

export const selectProducts = createSelector(
  selectProductState,
  state => state.products
)

export const selectCurrentProductId = selectRouterParam('productId')

export const selectCurrentProduct = createSelector(
  selectProducts,
  selectCurrentProductId,
  (products, id) => {
    if(id == null || !products) return undefined;
    return products.find(p => p.id === id)
  }
)
