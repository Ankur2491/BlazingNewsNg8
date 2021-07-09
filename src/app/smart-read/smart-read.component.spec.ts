import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartReadComponent } from './smart-read.component';

describe('SmartReadComponent', () => {
  let component: SmartReadComponent;
  let fixture: ComponentFixture<SmartReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
