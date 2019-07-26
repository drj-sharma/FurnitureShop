import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit {

  subcat: string;
  allProducts: [];
  msg: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
        this.subcat = params.subcatid;
      });
    this.fetchProducts();
    }

    // Fetch Products
    fetchProducts() {
      this.http.get('http://localhost:3000/api/fetchproducts?subcat=' + this.subcat, {responseType: 'json'}).subscribe(
        (response: []) => {
          if (response.length > 0) {
            this.allProducts = response;
          }
        },
        (error) => {
          this.msg = error;
        }
      );
    }
  }
