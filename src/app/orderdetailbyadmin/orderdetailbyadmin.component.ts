import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orderdetailbyadmin',
  templateUrl: './orderdetailbyadmin.component.html',
  styleUrls: ['./orderdetailbyadmin.component.css']
})
export class OrderdetailbyadminComponent implements OnInit {
  orderid: string;
  orders: any[];
  msg: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.orderid = param.orderid;
    });
    this.fetchCart();
  }

  fetchCart() {
    this.http.get('http://localhost:3000/api/getorderdetailsbyuser?orderid=' + this.orderid,
    {responseType: 'json'}).subscribe(
      (response: any[]) => {
        if (response.length > 0) {
          this.orders = response;
        } else {
          this.msg = 'No details found';
        }
      },
      (error) => {
        this.msg = error;
      }
    );
  }

}
