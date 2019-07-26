import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managecat',
  templateUrl: './managecat.component.html',
  styleUrls: ['./managecat.component.css']
})
export class ManagecatComponent implements OnInit {

  catname: string;
  myFile: File;
  msg: string;

  allCat: [];
  catpic: string;
  cid: string;
  vis = false;

  constructor(private http: HttpClient, private router: Router) {
    if (sessionStorage.getItem('utype') === 'normal') {
      this.router.navigateByUrl('**');
    } else if (sessionStorage.getItem('nm') == null) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get('http://localhost:3000/api/fetchcategories', {responseType: 'json'}).subscribe(
      (res: []) => {
        if (res.length > 0) {
          this.allCat = res;
        }
      },
      (err) => this.msg = err
    );
  }

  fileSelected(event) {
    this.myFile = event.target.files[0];
  }

  onSubmitcat() {
    const myData = new FormData();
    if (this.myFile != null) {
      myData.append('photo', this.myFile);
      myData.append('catname', this.catname);
    } else {
      myData.append('catname', this.catname);
    }
    this.http.post('http://localhost:3000/api/managecat', myData, {responseType: 'text'}).subscribe(
    (res) => {
      this.msg = res;
      this.fetchData();
    },
    (err) => this.msg = err
    );
}

  onCatupdate(catId, cName, cPic) {
    this.vis = true;
    this.catname = cName;
    this.catpic = cPic;
    this.cid = catId;
  }
  onCatupdatedb() {
    const myData = new FormData();
    if (this.myFile != null) {
      myData.append('photo', this.myFile); // new image
      myData.append('catname', this.catname);
      myData.append('cid', this.cid);
      myData.append('oldpic', this.catpic);
     } else {
      myData.append('catname', this.catname);
      myData.append('cid', this.cid);
      myData.append('oldpic', this.catpic);
     }

    this.http.put('http://localhost:3000/api/updatecat', myData, {responseType: 'text'}).subscribe(
        (res) => this.msg = res,
        (err) => this.msg = err
    );
  }

  // Delete category along sub-cat and their respective products
  onDel(id) {
    const sure = confirm('Are you sure?');
    if (sure) {
      this.http.delete('http://localhost:3000/api/delcat?id=' + id, {responseType: 'text'}).subscribe(
        (res) => {
          this.fetchData(),
          this.msg = res;
        },
        (err) => this.msg = err
    );
      this.http.delete('http://localhost:3000/api/delsubcat?id=' + id, {responseType: 'text'}).subscribe(
        (res) => {
          this.msg = res;
        },
        (err) => this.msg = err
    );
      this.http.delete('http://localhost:3000/api/delproducts?id=' + id, {responseType: 'text'}).subscribe(
        (res) => {
          this.msg = res;
        },
        (err) => this.msg = err
    );
    }
  }
}
