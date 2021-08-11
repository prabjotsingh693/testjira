import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegstrationComponent } from './user-regstration.component';

describe('UserRegstrationComponent', () => {
  let component: UserRegstrationComponent;
  let fixture: ComponentFixture<UserRegstrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegstrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegstrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
