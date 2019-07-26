import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id = '5d3498ca478c4c682ec6c7e8';
  allProducts: any[];
  allProducts1: any[];
  allProducts2: any[];
  subcat1 = '5d383052f58c3b4db8e86136';
  subcat2 = '5d36c862e624bd2d25c9840b';
  subcat3 = '5d3724986b105d4790f6394a';
  msg: string;
  rate1: number;
  remcost: number;
  dis: number;

  constructor( private http: HttpClient) { }

  ngOnInit() {
    this.fetchProducts1();
    }

    // Fetch Products
    fetchProducts1() {
      this.http.get('http://localhost:3000/api/fetchproductsforhome?subcat=' + this.subcat1, {responseType: 'json'}).subscribe(
        (response: any[]) => {
          if (response.length > 0) {
            this.allProducts = response;
            this.fetchProducts2();
          }
        },
        (error) => {
          this.msg = error;
        }
      );
    }
    fetchProducts2() {
      this.http.get('http://localhost:3000/api/fetchproductsforhome?subcat=' + this.subcat2, {responseType: 'json'}).subscribe(
        (response: any[]) => {
          if (response.length > 0) {
            this.allProducts1 = response;
            this.fetchProducts3();
          }
        },
        (error) => {
          this.msg = error;
        }
      );
    }
    fetchProducts3() {
      this.http.get('http://localhost:3000/api/fetchproductsforhome?subcat=' + this.subcat3, {responseType: 'json'}).subscribe(
        (response: any[]) => {
          if (response.length > 0) {
            this.allProducts2 = response;
          }
        },
        (error) => {
          this.msg = error;
        }
      );
    }

}
