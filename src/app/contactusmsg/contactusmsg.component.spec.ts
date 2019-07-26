import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusmsgComponent } from './contactusmsg.component';

describe('ContactusmsgComponent', () => {
  let component: ContactusmsgComponent;
  let fixture: ComponentFixture<ContactusmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactusmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
