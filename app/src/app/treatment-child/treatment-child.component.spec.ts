import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentChildComponent } from './treatment-child.component';

describe('TreatmentChildComponent', () => {
  let component: TreatmentChildComponent;
  let fixture: ComponentFixture<TreatmentChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentChildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
