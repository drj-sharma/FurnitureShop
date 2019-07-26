import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchuser',
  templateUrl: './searchuser.component.html',
  styleUrls: ['./searchuser.component.css']
})
export class SearchuserComponent implements OnInit {
  email: string;

  name: string;
  gen: string;
  ph: string;
  em: string;

  vis: boolean;
  userDetails: any[];

  msg: string;

  constructor(private http: HttpClient, private router: Router) {
    if (sessionStorage.getItem('utype') === 'normal') {
      this.router.navigateByUrl('**');
    } else if (sessionStorage.getItem('nm') == null) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
  }

  onSearchuser() {
    this.http.post('http://localhost:3000/api/srchusr?em=' + this.email, {responseType: 'json'}).subscribe(
      (response: any[]) => {
        if (response.length > 0) {
          this.msg = '';
          this.userDetails = response;
          this.name = response[0].Name;
          this.ph = response[0].Phone;
          this.em = response[0].Username;
          this.gen = response[0].Gender;
          this.vis = true;

        } else {
          this.vis = false;
          this.msg = 'Incorrect Username/Password';
        }
      },
      (error) => {
        this.msg = error;
      }
    );
  }
}
