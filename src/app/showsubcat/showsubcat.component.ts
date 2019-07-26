import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-showsubcat',
  templateUrl: './showsubcat.component.html',
  styleUrls: ['./showsubcat.component.css']
})
export class ShowsubcatComponent implements OnInit {

  allSubcat: [];
  cat  = '';
  msg: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(args => {
        this.cat = args.catid;
      });
    this.fetchSubdata();
  }

  fetchSubdata() {
    this.http.get('http://localhost:3000/api/fetchsubcategories?catid=' + this.cat, {responseType: 'json'}).subscribe(
      (response: []) => {
        if (response.length > 0) {
          this.allSubcat = response;
        }
      },
      (error) => this.msg = error
    );
  }
}
