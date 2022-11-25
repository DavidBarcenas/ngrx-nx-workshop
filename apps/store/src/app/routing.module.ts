import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'details/:productId', component: ProductDetailsComponent },
  // { path: 'cart', component: CartDetailsComponent },
  // { path: '', component: ProductListComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class RoutingModule {}
