import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.component.html',
  styleUrls: ['./manageproducts.component.css']
})
export class ManageproductsComponent implements OnInit {
  catg = '';
  subcatg = '';
  allCat: [];
  allSubcat: [];
  prodId: string;
  pname: string;
  price: number;
  discount: number;
  descp: string;
  stock: number;
  image: string;
  myFile: File;
  allProducts: any[];
  vis1: boolean;
  updateON: boolean;

  msg = '';

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

  // fetch cat-date
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
  this.http.get('http://localhost:3000/api/fetchsubcategories?catid=' + this.catg, {responseType: 'json'}).subscribe(
    (res: []) => {
      if (res.length > 0) {
        this.allSubcat = res;
      }
    },
    (err) => this.msg = err
  );
}
// Fetch Products
fetchProducts() {
  this.http.get('http://localhost:3000/api/fetchproducts?subcat=' +
  this.subcatg, {responseType: 'json'}).subscribe(
    (response: any[]) => {
      if (response.length > 0) {
        this.allProducts = response;
        this.vis1 = true;
      } else {
        this.vis1 = false;
      }
    },
    (error) => {
      this.msg = error;
      this.vis1 = false;
    }
  );
}

  onProductadd() {
    // this.fsize = this.myFile.size; can give cond. with max of required file
    // this.ftype = this.myFile.type; can give cond. with type of required file
    const myData = new FormData();
    if (this.myFile != null) {
      myData.append('cid', this.catg);
      myData.append('subcatid', this.subcatg);
      myData.append('pname', this.pname);
      myData.append('prate', this.price.toString());
      myData.append('pdesc', this.descp);
      myData.append('pdiscount', this.discount.toString());
      myData.append('photo', this.myFile);
      myData.append('pstock', this.stock.toString());
     } else {
      myData.append('cid', this.catg);
      myData.append('subcatid', this.subcatg);
      myData.append('pname', this.pname);
      myData.append('prate', this.price.toString());
      myData.append('pdesc', this.descp);
      myData.append('pdiscount', this.discount.toString());
      // myData.append('photo', this.myFile);
      myData.append('pstock', this.stock.toString());
      }
    this.http.post('http://localhost:3000/api/addproduct', myData, {responseType: 'text'}).subscribe(
        (res) => { this.msg = res; this.clearForm(); },
        (err) => this.msg = err
    );
  }
  // assign values from db to their respective ngmodels
  onProductUpdate(prod) {
    this.pname = prod.Name;
    this.price = prod.Price;
    this.discount = prod.Discount;
    this.descp = prod.Desc;
    this.image = prod.Image;
    this.stock = prod.Stock;
    // alert(this.pstock);
    this.prodId = prod._id;
    console.log(prod);
    this.updateON = true;
  }

  // Product update in database
  onProductdb() {
    // this.fsize=this.myfile.size;
    // this.ftype=this.myfile.type;
    const myData = new FormData();
    if (this.myFile != null) {
      myData.append('cid', this.catg);
      myData.append('prodid', this.prodId);
      myData.append('subcatid', this.subcatg);
      myData.append('pname', this.pname);
      myData.append('prate', this.price.toString());
      myData.append('pdesc', this.descp);
      myData.append('pdiscount', this.discount.toString());
      myData.append('photo', this.myFile);
      myData.append('oldpic', this.image);
      myData.append('pstock', this.stock.toString());
    } else {
      myData.append('cid', this.catg);
      myData.append('subcatid', this.subcatg);
      myData.append('prodid', this.prodId);
      myData.append('pname', this.pname);
      myData.append('prate', this.price.toString());
      myData.append('pdesc', this.descp);
      myData.append('pdiscount', this.discount.toString());
      myData.append('oldpic', this.image);
      myData.append('pstock', this.stock.toString());
    }
    this.http.put('http://localhost:3000/api/updateProduct', myData, {responseType: 'text'}).subscribe(
      (response) => {
        this.msg = response;
        this.clearForm();
      },
      (error) => {
        this.msg = error;
      }
    );
  }

  // Delete product
  onDel(id) {
    this.http.delete('http://localhost:3000/api/delprod?id=' + id , {responseType: 'text'}).subscribe(
      (res) => this.msg = res,
      (err) => this.msg = err
    );
  }

  // clear form
  clearForm() {
    this.catg = '';
    this.subcatg = '';
    this.pname = '';
    this.price = null;
    this.discount = null;
    this.descp = '';
    this.stock = null;
  }
}
