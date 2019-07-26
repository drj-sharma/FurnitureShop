import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  fname: string;
  email: string;
  phone: string;
  msg: string;
  msg1: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  onSubmit() {
    const params = {
      nm1: this.fname,
      em1: this.email,
      ph1: this.phone,
      msg: this.msg,
    };
    this.http.post('http://localhost:3000/api/contactus', params, {responseType: 'text'}).subscribe(
      (res) => this.msg1 = res,
      (err) => this.msg1 = err
    );
  }
}
