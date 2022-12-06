import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from '../cart/cart-details/cart-details.component';
import { ProductDetailsComponent } from '../product/product-details/product-details.component';
import { ProductListComponent } from '../product/product-list/product-list.component';
import { StoreModule } from "@ngrx/store";
import { routerFeatureKey } from "./router.selectors";
import { routerReducer } from "@ngrx/router-store";

const routes: Routes = [
  { path: '', component: ProductListComponent, pathMatch: 'full' },
  { path: 'details/:productId', component: ProductDetailsComponent },
  { path: 'cart', component: CartDetailsComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    StoreModule.forFeature(routerFeatureKey, routerReducer)
  ],
  exports: [RouterModule],
})
export class RoutingModule {}
