import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  public foodDetail: any;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private apiS: ApiService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.foodDetail = params;
    });
  }

  addToCart(food: any) {
    this.apiS.getAllBaskets().subscribe((cartItems: any) => {
      const existingItem = cartItems.find(
        (item: any) => item.product.id === food.id
      );
      alert(`პროდუქტი " ${food.name} " დაემატა კალათაში!`);
      if (existingItem) {
        existingItem.quantity++;

        this.apiS.updateBasket(existingItem).subscribe(() => {
          this.updateCartCount();
        });
      } else {
        this.apiS.addToBasket(food).subscribe(() => {
          this.updateCartCount();
        });
      }
    });
  }

  updateCartCount() {
    this.apiS.getAllBaskets().subscribe((data: any) => {
      const totalQuantity = data.reduce(
        (acc: number, item: any) => acc + item.quantity,
        0
      );

      this.cartService.updateCartCount(totalQuantity);
    });
  }
}
