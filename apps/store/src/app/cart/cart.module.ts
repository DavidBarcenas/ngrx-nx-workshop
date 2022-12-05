import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { cartFeatureKey, cartReducer } from "./cart.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CartEffects } from "./cart.effects";

@NgModule({
  imports: [
    StoreModule.forFeature(cartFeatureKey, cartReducer),
    EffectsModule.forFeature([CartEffects])
  ]
})
export class CartModule {}
