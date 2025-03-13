import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../cart.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 public cartCount: number = 0;
constructor(private cartservice: CartService) {
this.cartCountServ()
}

cartCountServ() {
  this.cartservice.cartCount$.subscribe((count) => {
    this.cartCount = count;
  });
}


}
