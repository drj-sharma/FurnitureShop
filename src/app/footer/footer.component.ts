import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  chairId = '5d3815f8514d2c0e77ed3d47';
  diningId = '5d21f6e11e28ec1719cc7c22';
  sofaId = '5d3498ca478c4c682ec6c7e8';

  constructor() { }

  ngOnInit() {
  }

}
