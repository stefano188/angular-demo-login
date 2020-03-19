import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  $orders: Observable<any>;

  constructor(private order: OrderService) { }

  ngOnInit() {
    this.$orders = this.order.getOrders();
  }

}
