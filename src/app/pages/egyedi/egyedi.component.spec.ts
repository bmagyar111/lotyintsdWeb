import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgyediComponent } from './egyedi.component';

describe('EgyediComponent', () => {
  let component: EgyediComponent;
  let fixture: ComponentFixture<EgyediComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EgyediComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EgyediComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
