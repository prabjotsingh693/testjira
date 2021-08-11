import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceSlipComponent } from './service-slip.component';

describe('ServiceSlipComponent', () => {
  let component: ServiceSlipComponent;
  let fixture: ComponentFixture<ServiceSlipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceSlipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
