import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CartComponent],
  imports: [CommonModule, MatIconModule],
  exports: [CartComponent],
})
export class CartModule {}
