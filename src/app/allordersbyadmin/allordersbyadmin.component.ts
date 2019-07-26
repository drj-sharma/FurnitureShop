import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-allordersbyadmin',
  templateUrl: './allordersbyadmin.component.html',
  styleUrls: ['./allordersbyadmin.component.css']
})
export class AllordersbyadminComponent implements OnInit {

  date: string;
  orderid: any;
  orders: any[];
  msg: string;
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.fetchOrder();
  }
  fetchOrder() {
    this.http.get('http://localhost:3000/api/getallorderdetails',
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
