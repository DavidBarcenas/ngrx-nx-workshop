import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { CartService } from './cart/cart.service';
import { ProductService } from './product/product.service';
import { RatingService } from './rating/rating.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [CartService, ProductService, RatingService],
})
export class AppModule {}
