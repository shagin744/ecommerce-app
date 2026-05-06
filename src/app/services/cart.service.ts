import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
//RxJS is a library used to handle asynchronous data streams in Angular. 
// It works with Observables to manage events like API calls, user input, and timers. 
// RxJS provides operators (map, filter, switchMap).

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = new BehaviorSubject<any[]>([]);

  // BehaviorSubject is an RxJS Subject that stores the latest value and 
  // immediately sends value it to new subscribers, 
  // commonly used for state management in Angular.

  cart$ = this.cartItems.asObservable();

  addToCart(product: any) {
    const items = this.cartItems.value;
    this.cartItems.next([...items, product]);
  }

  removeItem(index: number) {
    const items = this.cartItems.value;
    items.splice(index, 1);
    this.cartItems.next([...items]);
  }
}