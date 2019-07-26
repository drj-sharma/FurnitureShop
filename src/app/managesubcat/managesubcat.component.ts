import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managesubcat',
  templateUrl: './managesubcat.component.html',
  styleUrls: ['./managesubcat.component.css']
})
export class ManagesubcatComponent implements OnInit {
  vis1 = false;
  myFile: File;
  msg: string;
  allCat: [];
  allSubcat: [];
  scatname: string;
  scatpic: string;
  scId: string;
  vis = false;
  cat = '';
  id1: string;

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

  fileSelected(event) {
    this.myFile = event.target.files[0];
  }

  // fetch cat-data
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
  // fetch subcat-data
  fetchSubData() {
    this.http.get('http://localhost:3000/api/fetchsubcategories?catid=' + this.cat, {responseType: 'json'}).subscribe(
      (res: []) => {
        if (res.length > 0) {
          this.allSubcat = res;
          this.vis1 = true;
        }
      },
      (err) => this.msg = err
    );
  }


  onSubmitsubcat() {
     // this.fsize = this.myFile.size; can give cond. with max of required file
    // this.ftype = this.myFile.type; can give cond. with type of required file
    const myData = new FormData();
    if (this.myFile != null) {
      myData.append('cid', this.cat);
      myData.append('photo', this.myFile);
      myData.append('scatname', this.scatname);
     } else {
        myData.append('cid', this.cat);
        myData.append('scatname', this.scatname);
      }
    this.http.post('http://localhost:3000/api/addsubcat', myData, {responseType: 'text'}).subscribe(
        (res) => this.msg = res,
        (err) => this.msg = err
   );
}

  onSubcatupdate(id, catid, scname, scpic) {
    this.vis = true;
    this.cat = catid;
    this.scatname = scname;
    this.scatpic = scpic;
    this.scId = id;
  }

  onScatupdatedb() {
    {
      const myData = new FormData();
      if (this.myFile != null) {
        myData.append('photo', this.myFile);  // new image
        myData.append('scatname', this.scatname);  // old name or new name
        myData.append('scid', this.scId);
        myData.append('catid', this.cat);
        myData.append('oldpic', this.scatpic);
      } else {
        myData.append('scatname', this.scatname);  // old name or new name
        myData.append('scid', this.scId);
        myData.append('catid', this.cat);
        myData.append('oldpic', this.scatpic);
      }
      this.http.put('http://localhost:3000/api/updatesubcat', myData, {responseType: 'text'}).subscribe(
        (response) => this.msg = response,
        (error) => this.msg = error
      );
    }
  }
  onDel(id) {
    const sure = confirm('Are you sure?');
    if (sure) {
    this.http.delete('http://localhost:3000/api/delsubcatbyid?id=' + id, {responseType: 'text'}).subscribe(
      (res) => {
        this.msg = res;
        this.fetchSubData();
    },
      (err) => this.msg = err
    );
    this.http.delete('http://localhost:3000/api/delproductsbysubid?id=' + id, {responseType: 'text'}).subscribe(
      (res) => this.msg = res,
      (err) => this.msg = err
     );
   }
  }
}
