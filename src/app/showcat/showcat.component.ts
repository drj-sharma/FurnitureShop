import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-showcat',
  templateUrl: './showcat.component.html',
  styleUrls: ['./showcat.component.css']
})
export class ShowcatComponent implements OnInit {

  allCat: [];
  msg: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchData();
  }

  // Fetch Category Data
  fetchData() {
    this.http.get('http://localhost:3000/api/fetchcategories', {responseType: 'json'}).subscribe(
      (res: []) => {
        if (res.length > 0) {
          this.allCat = res;
        }
      },
      (err) => this.msg = err
    );
  }

}
