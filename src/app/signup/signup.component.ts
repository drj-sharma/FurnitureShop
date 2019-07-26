import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  fullname: string;
  gender: string;
  phone: string;
  email: string;
  pass: string;
  vis1: boolean;

  msg: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  onSignup() {
    const params = {
      nm: this.fullname,
      gen: this.gender,
      ph: this.phone,
      em: this.email,
      pass: this.pass,
      utype: 'normal'
    };

    this.http.post('http://localhost:3000/api/signup', params, {responseType: 'text'}).subscribe(
      (res) => {
        this.msg = res;
        this.vis1 = true;
      },
      (err) => {
        this.msg = err;
      }
    );
  }
}

