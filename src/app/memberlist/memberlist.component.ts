import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.css']
})
export class MemberlistComponent implements OnInit {

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
    this.allUser();
  }

  allUser() {
    this.http.get('http://localhost:3000/api/alluser', {responseType: 'json'}).subscribe(
      (response: any[]) => {
        if (response.length > 0) {
          this.userDetails = response;
        } else {
          this.msg = 'No Record Found';
        }
      },
      (error) => {
        this.msg = error;
      }
    );
  }

  userDelete(id) {
// to show alertWindow to display id...
const think = confirm('Are you sure to delete this user?');
if (think) {

this.http.delete('http://localhost:3000/api/delmemb?id=' + id, {responseType: 'text'}).subscribe(
  (response) => {
    this.allUser();
  },
  (error) => {
    this.msg = error;
  });
  }
 }
}
