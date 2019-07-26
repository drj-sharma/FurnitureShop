import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ordernumbertohistory',
  templateUrl: './ordernumbertohistory.component.html',
  styleUrls: ['./ordernumbertohistory.component.css']
})
export class OrdernumbertohistoryComponent implements OnInit {
  date: string;
  orderid: any;
  orders: any[];
  msg: string;
  constructor(private route: ActivatedRoute, private http: HttpClient) { }
  ngOnInit() {
    this.fetchOrder();
  }
  fetchOrder() {
    this.http.get('http://localhost:3000/api/getorderdetailbyordernum?uname=' + sessionStorage.getItem('uname'),
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
