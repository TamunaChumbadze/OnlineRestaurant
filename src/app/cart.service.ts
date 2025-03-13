

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private apiS: ApiService) {
    this.updateCartCountOnLoad();
  }

  updateCartCountOnLoad() {
    this.apiS.getAllBaskets().subscribe((data: any) => {
      const totalQuantity = data.reduce((acc: number, item: any) => acc + item.quantity, 0);
      this.cartCount.next(totalQuantity);
    });
  }

  updateCartCount(count: number) {
    this.cartCount.next(count);
  }

  removeFromBasket(id: number) {
    return this.apiS.removeFromBasket(id);
  }
}
