import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css']
})
export class ChangepassComponent implements OnInit {

  cpass: string;
  npass: string;
  cnfpass: string;

  msg: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onChangepass() {
      if (this.npass === this.cnfpass) {
        const params = {
          un: sessionStorage.getItem('uname'),
          cpass: this.cpass,
          newp: this.npass
        };
        this.http.put('http://localhost:3000/api/changepassword', params, {responseType: 'json'}).subscribe(
          (res) => {
            if (res['nModified'] === 0) { // by res(data)
                this.msg = 'Current Password Incorrect!'; // For { ok: 0, nModified: 0, n: 0 }
            } else if (res['nModified'] === 1) {
              this.msg = 'Password Changed Successfully!';  // Successfully updated { ok: 1, nModified: 1, n: 1 }
            }
          });
      } else {
          this.msg = 'Passwords do not match, try again!';
    }
  }
}
