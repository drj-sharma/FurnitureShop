import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  vis: boolean;
  name: string;
  vis2 = false;
  search: string;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.onAdmin();
        this.ngOnInit();
      }
    });
  }

ngOnInit() {
    if (sessionStorage.getItem('nm') != null) {
      this.name = sessionStorage.getItem('nm');
      this.vis = false;
    } else {
      this.name = 'Guest';
      this.vis = true;
    }
  }

  onLogout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/sitehome');
  }
  onAdmin() {
    if (sessionStorage.getItem('utype') === 'admin') {
      this.vis2 = true;
    } else {
    this.vis2 = false;
  }
}
  backAdminbtn() {
    this.router.navigateByUrl('/adminpanel');
  }
}
