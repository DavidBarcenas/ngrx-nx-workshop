import {createReducer} from "@ngrx/store";
import { Product } from "@ngrx-nx-workshop/api-interfaces";

interface ProductReducer {
  products: Product[]
}

export const initialState: ProductReducer = {
  products: []
};

export const productsReducer = createReducer(initialState)
