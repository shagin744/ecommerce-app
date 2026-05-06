import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// HttpClient is an Angular service used to communicate with backend APIs. 
// It allows you to perform HTTP requests like GET, POST, PUT, DELETE. 
// so we can use RxJS operators for handling data. 
// It also supports error handling, headers, and interceptors.

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  api = 'https://fakestoreapi.com/products';

  // Interceptors are used to catch and modify HTTP requests and responses in Angular.
  // They work with HttpClient and act like a middleware between the app and backend.

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.api);
  }

  
  getProduct(id: string) {
    return this.http.get(`${this.api}/${id}`);
  }
}