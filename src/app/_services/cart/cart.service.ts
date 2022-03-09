import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '@loading';
import { CookieService } from 'ngx-cookie-service'
import { BehaviorSubject, Observable, of } from 'rxjs';
import { CartItemCookieModel } from '@app_models/order/cart-item-cookie';

export const CART_ITEMS_COOKIE_NAME: string = 'cart_items';

@Injectable({
  providedIn: 'any',
})
export class CartService {

  private itemsCount: number = 0;
  private cartItems: CartItemCookieModel[] = [];

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private toastr: ToastrService,
    private loading: LoadingService,
  ) {
    this.loadCart();
  }

  getCartItems(): CartItemCookieModel[] {
    this.loadCart();
    console.log('service get item', this.cartItems);
    return this.cartItems;
  }

  getCartItemsCount(): number {
    this.loadCart();
    return this.itemsCount
  }

  addToCart(item: CartItemCookieModel) {
    console.log('addd');

    this.loading.loadingOn();

    //-----check if there are items already added in cart
    let existingItems: CartItemCookieModel[] = [];

    if (this.cookieService.check(CART_ITEMS_COOKIE_NAME)) {
      existingItems = JSON.parse(this.cookieService.get(CART_ITEMS_COOKIE_NAME));

      if (existingItems !== null) {
        console.log('Items exists');

        const currentProductInCart: CartItemCookieModel = existingItems.find(x => x.productId === item.productId);
        if (currentProductInCart !== undefined) {
          currentProductInCart.count = currentProductInCart.count + item.count;

          const index = existingItems.findIndex((o) => o.productId === currentProductInCart.productId);

          if (index > -1) {
            existingItems.splice(index, 1);
          }

          existingItems = [currentProductInCart, ...existingItems]

        } else {
          existingItems = [item, ...existingItems]
        }
      } else {
        existingItems = [item];
      }
    }
    else {
      existingItems = [item];
    }

    this.cartItems = existingItems;
    console.log('service added', this.cartItems);

    this.loading.loadingOff();
    this.saveCart();
  }

  loadCart(): void {
    console.log('service load');

    const itemsInCookie = this.cookieService.get(CART_ITEMS_COOKIE_NAME);
    if (itemsInCookie !== undefined && itemsInCookie !== '') {
      const items: CartItemCookieModel[] = JSON.parse(itemsInCookie);
      console.log('service load', items);
      this.cartItems = items;
    } else {
      this.cartItems = [];
      console.log('service else');
    }
    this.calculateAllItemsCount();
  }

  saveCart(): void {
    this.cookieService.delete(CART_ITEMS_COOKIE_NAME);

    if (this.cartItems.length > 0) {
      console.log('service save success');
      this.cookieService.set(CART_ITEMS_COOKIE_NAME, JSON.stringify(this.cartItems), 200000)
    }

    this.calculateAllItemsCount();
  }

  clearCart() {
    this.cookieService.delete(CART_ITEMS_COOKIE_NAME);
    this.cartItems = [];
    this.calculateAllItemsCount();
  }

  removeItem(productId: string) {
    const index = this.cartItems.findIndex((o) => o.productId === productId);

    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.saveCart();
    }
  }

  itemInCart(productId: string): Observable<boolean> {
    this.loadCart();
    const exists = this.cartItems.findIndex((o) => o.productId === productId) > -1;

    return of(exists);
  }

  get itemsTotalPrice(): number {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      totalPrice = totalPrice + item.unitPrice;
    }
    return totalPrice;
  }

  private calculateAllItemsCount() {
    let count = 0;
    for (const item of this.cartItems) {
      count = count + item.count;
    }
    console.log('count', count);

    this.itemsCount = count;
    console.log(this.itemsCount);

  }
}