import { Component, OnInit } from '@angular/core';
import { Product, Rating } from "@ngrx-nx-workshop/api-interfaces";
import { map, Observable, shareReplay } from 'rxjs';
import { ProductModel } from '../../model/product';
import { ProductService } from '../product.service';
import { RatingService } from '../rating.service';
import {Store} from "@ngrx/store";

@Component({
  selector: 'ngrx-nx-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products$?: Observable<ProductModel[]>;
  customerRatings$?: Observable<{ [productId: string]: Rating }>;

  constructor(
    private readonly productService: ProductService,
    private readonly ratingService: RatingService,
    private store: Store<{product: {products: Product[]}}>
  ) {}

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();

    this.customerRatings$ = this.ratingService.getRatings().pipe(
      map((ratingsArray) =>
        // Convert from Array to Indexable.
        ratingsArray.reduce(
          (acc: { [productId: string]: Rating }, ratingItem) => {
            acc[ratingItem.productId] = ratingItem.rating;
            return acc;
          },
          {}
        )
      ),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
  }
}
