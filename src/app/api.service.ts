import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Basket {
  product: {
    id: number;
    name: string;
    price: number;
  };
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(public http: HttpClient) { }

  getAllCategories() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Categories/GetAll")
  }

  getAllProducts() {
    return this.http.get("https://restaurant.stepprojects.ge/api/Products/GetAll")
  }

  
  getAllBaskets(): Observable<Basket[]> {
    return this.http.get<Basket[]>("https://restaurant.stepprojects.ge/api/Baskets/GetAll");
  }

  addToBasket(product: any): Observable<any> {
    return this.http.post("https://restaurant.stepprojects.ge/api/Baskets/AddToBasket", {
      productid: product.id,
      name: product.name,
      quantity: 1,
      price: product.price
    });
  }

  updateBasket(item: any): Observable<any> {
    return this.http.put("https://restaurant.stepprojects.ge/api/Baskets/UpdateBasket", {
      productId: item.product.id, 
      quantity: item.quantity,    
      price: item.product.price  
    });
  }

  removeFromBasket(productId: number): Observable<any> {
    return this.http.delete(`https://restaurant.stepprojects.ge/api/Baskets/DeleteProduct/${productId}`);
  }
}
