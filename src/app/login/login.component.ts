import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  pass: string;
  userInfo: any[];

  msg: string;

  constructor(private http: HttpClient, private myrouter: Router) { }

  ngOnInit() {
  }
  onLogin() {
    const params = {
      username: this.email,
      pass: this.pass
    };
    this.http.post('http://localhost:3000/api/login', params, {responseType: 'json'}).subscribe(
      (response: any[]) => {
        if (response.length > 0) {
          this.userInfo = response;
          sessionStorage.setItem('nm', this.userInfo[0].Name);
          sessionStorage.setItem('uname', this.userInfo[0].Username);
          if (this.userInfo[0].Usertype === 'admin') {
            sessionStorage.setItem('utype', 'admin');
            this.myrouter.navigateByUrl('adminpanel');
          } else {
            sessionStorage.setItem('utype', 'normal');
            this.myrouter.navigateByUrl('sitehome');
          }
        } else {
          this.msg = 'Incorrect Username/Password';
        }
      },
      (error) => {
        this.msg = error;
      }
    );
  }
}
