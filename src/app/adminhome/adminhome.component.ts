import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor(private router: Router) {
    if (sessionStorage.getItem('utype') === 'normal') {
      this.router.navigateByUrl('/error');
    } else if (sessionStorage.getItem('nm') == null) {
      this.router.navigateByUrl('/login');
    }
  }

  ngOnInit() {
  }

}
