import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagRegstrationProductDetailComponent } from './tag-regstration-product-detail.component';

describe('TagRegstrationProductDetailComponent', () => {
  let component: TagRegstrationProductDetailComponent;
  let fixture: ComponentFixture<TagRegstrationProductDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagRegstrationProductDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagRegstrationProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
