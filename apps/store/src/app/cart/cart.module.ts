import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { CART_FEATURE_KEY, cartReducer } from "./cart.reducer";

@NgModule({
  imports: [StoreModule.forFeature(CART_FEATURE_KEY, cartReducer)]
})
export class CartModule {}