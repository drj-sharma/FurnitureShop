import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-updatestatus',
  templateUrl: './updatestatus.component.html',
  styleUrls: ['./updatestatus.component.css']
})
export class UpdatestatusComponent implements OnInit {
  orderID: string;
  status: string;
  nst = '';
  msg: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.orderID = param.orderid;
      this.status = param.st;
    });
  }
  // Update status
  updateStatus() {
    const vals = {newstatus: this.nst, orderid: this.orderID};
    this.http.put('http://localhost:3000/api/updateStatus', vals, {responseType: 'text'}).subscribe(
      (res) => this.msg = res,
      (err) => this.msg = err
    );
  }
}
