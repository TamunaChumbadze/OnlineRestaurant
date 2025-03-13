import { Component } from '@angular/core';
import { CategoriesComponent } from "../categories/categories.component";
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-home',
  imports: [CategoriesComponent, LoaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']  
})
export class HomeComponent {

  constructor(public apiS: ApiService, public router: Router, private cartService: CartService) {
    this.showAllFoods()
  }

  public foodList: any;
  public cartCount: number = 0;

  showAllFoods() {
    this.apiS.getAllProducts().subscribe((data: any) => {
      this.foodList = data;
    });
  }

  addToCart(food: any) {
    
    this.apiS.getAllBaskets().subscribe((cartItems: any) => {
      const existingItem = cartItems.find((item: any) => item.product.id === food.id);
      alert(`პროდუქტი " ${food.name} " დაემატა კალათაში!`);
      if (existingItem) {
        
        existingItem.quantity++;
        this.apiS.updateBasket(existingItem).subscribe(() => {
          this.updateCartCount();  
          alert(`პროდუქტის რაოდენობა გაიზარდა ${existingItem.quantity} -მდე`);
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
      const totalQuantity = data.reduce((acc: any, item: any) => acc + item.quantity, 0);
      this.cartService.updateCartCount(totalQuantity);  
    });
  }

  goToDetails(food: any) {
    this.router.navigate(['/details'], { queryParams: food });
  }
}
