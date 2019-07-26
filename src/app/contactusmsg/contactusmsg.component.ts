import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contactusmsg',
  templateUrl: './contactusmsg.component.html',
  styleUrls: ['./contactusmsg.component.css']
})
export class ContactusmsgComponent implements OnInit {
  name: string;
  phone: string;
  email: string;
  message: string;
  allMsg: any[];
  msg: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchContactusMessages();
  }

  fetchContactusMessages() {
    this.http.get('http://localhost:3000/api/fetchContactusmessages', {responseType: 'json'}).subscribe(
      (res: []) => {
        if (res.length > 0) {
          this.allMsg = res;
        }
      },
      (err) => this.msg = err
    );
  }

}
