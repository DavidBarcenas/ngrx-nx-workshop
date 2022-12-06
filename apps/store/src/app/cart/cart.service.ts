import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '@ngrx-nx-workshop/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject$ = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject$.asObservable();

  constructor(private readonly http: HttpClient) {}

  addProduct(id: string): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(`/api/cart/add/${id}`, {})
  }

  removeProduct(id: string): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(`/api/cart/remove/${id}`, {});
  }

  removeAll(): Observable<CartItem[]> {
    return this.http.post<CartItem[]>(`/api/cart/clear`, {});
  }

  getCartProducts(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`/api/cart/cart-content`)
  }

  purchase(purchaseItems: CartItem[]): Observable<boolean> {
    return this.http.post<boolean>(`/api/cart/purchase`, purchaseItems);
  }
}
