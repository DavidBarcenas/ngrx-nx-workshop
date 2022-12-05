import { createAction, props } from "@ngrx/store";
import { CartItem } from "@ngrx-nx-workshop/api-interfaces";

export const timerTick = createAction('[Cart Effects] periodic timer tick')

export const fetchCartItemsSuccess = createAction(
  '[Cart API] fetch items success',
  props<{cartItems: CartItem[]}>()
)

export const fetchCartItemsError = createAction(
  '[Cart API] fetch items error',
  props<{errorMessage: string}>()
)

export const addToCartSuccess = createAction('[Cart API] add product success')

export const addToCartError = createAction(
  '[Cart API] add product error',
  props<{productId: string, errorMessage: string}>()
)
