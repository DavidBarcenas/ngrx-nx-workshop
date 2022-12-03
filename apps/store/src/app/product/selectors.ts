import { GlobalState } from "./product.reducer";

export const getProducts = (state: GlobalState) => state.product.products
