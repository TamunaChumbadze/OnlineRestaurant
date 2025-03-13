import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';

import { DetailsComponent } from './details/details.component';
import { CartComponent } from './cart/cart.component';
import { LoaderComponent } from './loader/loader.component';


export const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "categories", component: CategoriesComponent},
    {path: "details", component: DetailsComponent},
    {path: "cart", component: CartComponent},
    {path: "loader", component: LoaderComponent}
   
];
