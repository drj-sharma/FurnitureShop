import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdernumbertohistoryComponent } from './ordernumbertohistory.component';

describe('OrdernumbertohistoryComponent', () => {
  let component: OrdernumbertohistoryComponent;
  let fixture: ComponentFixture<OrdernumbertohistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdernumbertohistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdernumbertohistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
