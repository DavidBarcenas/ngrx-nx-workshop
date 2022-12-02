import { isDevMode, NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { RoutingModule } from './routing.module';
import { AngularMaterialModule } from './common/angular-material.module';

import { CartIconComponent } from './cart/cart-icon/cart-icon.component';
import { AppComponent } from './app.component';
import { CartDetailsComponent } from './cart/cart-details/cart-details.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { SpinnerComponent } from './common/spinner.component';
import { StarsComponent } from './common/stars/stars.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducer } from "./product/reducer";
import { EffectsModule } from "@ngrx/effects";
import { ProductEffects } from "./product/effects";

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
      {product: reducer},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([ProductEffects]),
    !environment.production ? StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
    }) : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
