import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllordersbyadminComponent } from './allordersbyadmin.component';

describe('AllordersbyadminComponent', () => {
  let component: AllordersbyadminComponent;
  let fixture: ComponentFixture<AllordersbyadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllordersbyadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllordersbyadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
