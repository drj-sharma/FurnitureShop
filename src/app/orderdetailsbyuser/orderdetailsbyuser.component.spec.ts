import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdetailsbyuserComponent } from './orderdetailsbyuser.component';

describe('OrderdetailsbyuserComponent', () => {
  let component: OrderdetailsbyuserComponent;
  let fixture: ComponentFixture<OrderdetailsbyuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderdetailsbyuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdetailsbyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
