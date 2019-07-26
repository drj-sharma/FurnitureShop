import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-searchinput',
  templateUrl: './searchinput.component.html',
  styleUrls: ['./searchinput.component.css']
})
export class SearchinputComponent implements OnInit {
  srch: string;
  searchProducts: any[];
  msg: string;
  msg1: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.srch = params.query;
    });
    this.onSearch();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  onSearch() {
    this.http.get('http://localhost:3000/api/fetchproductbysearch?querysearch=' + this.srch, {responseType: 'json'}).subscribe(
      (res: any[]) => {
        if (res.length > 0) {
          this.searchProducts = res;
        } else {
          this.msg1 = 'No result found';
        }
      },
      (err) => this.msg = err
    );
  }
}
