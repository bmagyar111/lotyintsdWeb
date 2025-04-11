import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItallapComponent } from './itallap.component';

describe('ItallapComponent', () => {
  let component: ItallapComponent;
  let fixture: ComponentFixture<ItallapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItallapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItallapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
