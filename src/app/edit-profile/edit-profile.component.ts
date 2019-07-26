import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  fullname: string;
  phone: string;
  email: string;
  userDetail: any[] = [];

  msg: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchUserinfo();
  }

  fetchUserinfo() {
    this.http.get('http://localhost:3000/api/fetchuserdetail?uname=' + sessionStorage.getItem('uname'), {responseType: 'json'}).subscribe(
      (res: []) => {
        if (res.length > 0) {
          this.userDetail = res;
          this.onUpdate();
        }
      },
      (err) => this.msg = err
    );
  }
  onUpdate()  {
    this.fullname = this.userDetail[0].Name;
    this.email = this.userDetail[0].Username;
    this.phone = this.userDetail[0].Phone;
  }
  updateProfile() {
    const params = {
      nm: this.fullname,
      em: this.email,
      ph: this.phone,
      oldem: sessionStorage.getItem('uname')
    };
    this.http.put('http://localhost:3000/api/editprofile', params, {responseType: 'json'}).subscribe(
      (res) => {
        if (res['nModified'] === 0) { // by res(data)
            this.msg = 'Error!'; // For { ok: 0, nModified: 0, n: 0 }
        } else if (res['nModified'] === 1) {
          this.msg = 'Updated Succesfully!';  // Successfully updated { ok: 1, nModified: 1, n: 1 }
        }
      });
  }
}
