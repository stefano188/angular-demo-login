import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  getOrders() {
    let token = localStorage.getItem('token');
    let headers = { 'Authorization': 'Bearer ' + token };
    return this.http.get('/api/orders', { headers }).
      pipe(map(response => {
        let orders = response as any;
        return orders;
      }))
  }
}
