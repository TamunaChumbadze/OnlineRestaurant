import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
 constructor(public apiS: ApiService, public router: Router) {
    this.showAllCategories()
  }

  public categoriesList: any

  showAllCategories() {
    this.apiS.getAllCategories().subscribe( (data:any) => {
      
      this.categoriesList = data
    })
  }
}
