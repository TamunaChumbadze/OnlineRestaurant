import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../api.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']  
})
export class CartComponent {

  public cartItems: any[] = [];

  constructor(public apiS: ApiService, public router: Router, public cartService: CartService) {
    this.loadCart();
  }

  loadCart() {
    this.apiS.getAllBaskets().subscribe((data: any) => {
      this.cartItems = data;
      this.updateCartCount();
    });
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.apiS.updateBasket(item).subscribe(() => {
      this.loadCart();  
    });
  }
  
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.apiS.updateBasket(item).subscribe(() => {
        this.loadCart();  
      });
    }
  }

  updateBasket(item: any) {
    this.apiS.updateBasket(item).subscribe(() => {
      this.loadCart();  
    });
  }

  removeFromCart(item: any) {
    if (!item || !item.product || !item.product.id) {
      console.error("Error: item or item.product.id is undefined!", item);
      return;
    }

  

    this.apiS.removeFromBasket(item.product.id).subscribe({
      next: () => {
        alert("პროდუქტი კალათიდან წაიშალა წარმატებით");
        this.cartItems = this.cartItems.filter(i => i.product.id !== item.product.id);  
        this.updateCartCount();
      },
      error: (error) => {
        console.error("Error removing item:", error);
      }
    });
  }

  updateCartCount() {
    const totalQuantity = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    this.cartService.updateCartCount(totalQuantity);  
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.product.id === item.product.id);

    if (existingItem) {
      existingItem.quantity++;
      this.updateBasket(existingItem);  
    } else {
      this.apiS.addToBasket(item).subscribe(() => {
        this.loadCart();  
      });
    }
  }
}
