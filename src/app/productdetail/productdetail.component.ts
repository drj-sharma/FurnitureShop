import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  prodid: string;
  details: any[];
  msg: string;

  pname: string;
  rate: number;
  dis: number;
  descp: string;
  ppic: string;
  pstock: number;
  remcost: number;
  uname: any;
  tc: any;
  qty = 1;
  showstock: number[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.prodid = params.prodid;
        this.fetchproddetails();
      });
  }

  fetchproddetails() {
    this.http.get('http://localhost:3000/api/fetchproddetails?pid=' + this.prodid, {responseType: 'json'}).subscribe(
      (response: any[]) => {
        if (response.length > 0) {
          this.pname = response[0].Name;
          this.rate = response[0].Price;
          this.dis = response[0].Discount;
          this.descp = response[0].Desc;
          this.ppic = response[0].Image;
          this.pstock = response[0].Stock;
          this.showstock.splice(1, this.showstock.length);
          // alert(this.pstock);

          if (this.pstock < 10) {
            for (let i = 1; i <= this.pstock; i++) {
              this.showstock.push(i);
            }
          } else {
            for (let i = 1; i <= 10; i++) {
            this.showstock.push(i);
            }
          }
          this.remcost = this.rate - ((this.rate * this.dis) / 100);
        } else {
          this.msg = 'No details found';
        }
      },
      (error) => {
        this.msg = error;
      }
    );
  }

  onAddtocart() {
    this.uname = sessionStorage.getItem('uname');
    if (this.uname === null) {
      this.msg = 'Please login to add product to cart';
      return;
    } else {
      this.tc = this.qty * this.remcost;
      const vals = {prodid: this.prodid, pname: this.pname, prate: this.remcost, qt: this.qty,
      tc: this.tc, ppic: this.ppic, username: this.uname};
      this.http.post('http://localhost:3000/api/addcart', vals,
      {responseType: 'text'}).subscribe(
        (response) => {
        this.msg = response;
        this.router.navigateByUrl('/cartinfo');
        },
        (error) => {
          this.msg = error;
        }
      );
    }
  }
}
