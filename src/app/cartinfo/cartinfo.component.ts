import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cartinfo',
  templateUrl: './cartinfo.component.html',
  styleUrls: ['./cartinfo.component.css']
})
export class CartinfoComponent implements OnInit {
  cart: any[];
  visibility = false;
  msg: string;
  prodCount: number;
  gtotal = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchCart();
  }

  // fetch cart
  fetchCart() {
  this.http.get('http://localhost:3000/api/fetchcart?uname=' + sessionStorage.getItem('uname'), {responseType: 'json'}).subscribe(
      (res: any[]) => {
        if (res.length > 0) {
          this.cart = res;
          this.prodCount = this.cart.length;
          this.fetchtotal();
        } else {
          this.msg = 'No details found';
          this.visibility = true;
        }
      }
    );
  }
  fetchtotal() {
// tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.cart.length; x++) {
      this.gtotal += this.cart[x].tc;
    }
    sessionStorage.setItem('billtotal', this.gtotal.toString());
  }

  onProdcart(id) {
    this.http.delete('http://localhost:3000/api/deletecartprod?id=' + id, {responseType: 'text'}).subscribe(
      (res) => {
        const confrm = confirm ('Are you sure?');
        if (confrm) {
        this.gtotal = 0;
        this.fetchCart();
        }
      },
      (err) => this.msg = err
    );
  }

}
