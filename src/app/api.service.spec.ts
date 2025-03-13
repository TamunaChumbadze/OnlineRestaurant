import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  getAllCategories() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Categories/GetAll");
  }

  getAllProducts() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Products/GetAll");
  }
  
  getAllBaskets(): Observable<any[]> {
    return this.http.get<any[]>("https://restaurant.stepprojects.ge/api/Baskets/GetAll");
  }

  addToBasket(product: any): Observable<any> {
    return this.http.post("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
      productid: product.id,
      quantity: 1,
      price: product.price
    });
  }

  updateBasket(item: any): Observable<any> {
    return this.http.put("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
      productId: item.productId,
      quantity: item.quantity,
      price: item.price
    });
  }

  removeFromBasket(productId: number): Observable<any> {
    return this.http.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${productId}`);
  }
}
