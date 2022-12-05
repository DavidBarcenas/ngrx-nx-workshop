import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cartFeatureKey, CartState } from "./cart.reducer";

export const cartFeature = createFeatureSelector<CartState>(cartFeatureKey);

export const selectCartItems = createSelector(
  cartFeature,
  state => state.cartItems
)

export const selectCartItemsCount = createSelector(
  selectCartItems,
  cartItems => cartItems
    ? Object.values(cartItems).reduce((acc, quantity) => acc + quantity, 0)
    : 0
)
