import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cart.component.html'
})
export class CartComponent {

  cartItems: any[] = [];

  constructor(private cartService: CartService) {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  getTotal() {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}