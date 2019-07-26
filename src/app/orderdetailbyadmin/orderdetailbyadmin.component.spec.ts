import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdetailbyadminComponent } from './orderdetailbyadmin.component';

describe('OrderdetailbyadminComponent', () => {
  let component: OrderdetailbyadminComponent;
  let fixture: ComponentFixture<OrderdetailbyadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderdetailbyadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdetailbyadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
