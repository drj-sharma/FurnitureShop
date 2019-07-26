import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  address: string;
  vis = false;
  msg: any;
  mode: string;
  cnum: string;
  comname: string;
  date: string;
  hname: string;
  cvvnum: string;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  onCardclick() {
    this.vis = true;
  }

  onCodclick() {
    this.vis = false;
  }

  onPayment() {
    const params = {
    billtot: sessionStorage.getItem('billtotal'),
    add: this.address,
    un: sessionStorage.getItem('uname'),
    pmode: this.mode,
    cardno: this.cnum,
    coname: this.comname,
    hname: this.hname,
    expdt: this.date,
    cvv: this.cvvnum
    };
    this.http.post('http://localhost:3000/api/checkout', params, {responseType: 'text'}).subscribe(
      (response) => {
        this.msg = response;
        this.router.navigateByUrl('/ordersummary');
      },
      (error) => this.msg = error
    );
  }
}
