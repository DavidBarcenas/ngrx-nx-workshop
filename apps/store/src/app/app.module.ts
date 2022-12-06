import { isDevMode, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { RoutingModule } from "./router/routing.module";
import { AngularMaterialModule } from "./common/angular-material.module";

import { CartIconComponent } from "./cart/cart-icon/cart-icon.component";
import { AppComponent } from "./app.component";
import { CartDetailsComponent } from "./cart/cart-details/cart-details.component";
import { ProductListComponent } from "./product/product-list/product-list.component";
import { SpinnerComponent } from "./common/spinner.component";
import { StarsComponent } from "./common/stars/stars.component";
import { ProductDetailsComponent } from "./product/product-details/product-details.component";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from "@ngrx/effects";
import { ProductEffects } from "./product/product.effects";
import { ErrorEffects } from "./error.effects";
import { productFeatureKey, productsReducer } from "./product/product.reducer";
import { CartModule } from "./cart/cart.module";
import { RouterState, StoreRouterConnectingModule } from "@ngrx/router-store";
import { routerFeatureState } from "./router/router.selectors";

@NgModule({
  declarations: [
    AppComponent,
    CartIconComponent,
    CartDetailsComponent,
    ProductListComponent,
    SpinnerComponent,
    StarsComponent,
    ProductDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RoutingModule,
    AngularMaterialModule,
    StoreModule.forRoot(
      {[productFeatureKey]: productsReducer},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([ProductEffects, ErrorEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: routerFeatureState,
      routerState: RouterState.Minimal
    }),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }) : [],
    CartModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
