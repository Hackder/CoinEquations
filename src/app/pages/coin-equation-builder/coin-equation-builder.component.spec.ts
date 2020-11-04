import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinEquationBuilderComponent } from './coin-equation-builder.component';

describe('CoinEquationBuilderComponent', () => {
  let component: CoinEquationBuilderComponent;
  let fixture: ComponentFixture<CoinEquationBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinEquationBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinEquationBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
