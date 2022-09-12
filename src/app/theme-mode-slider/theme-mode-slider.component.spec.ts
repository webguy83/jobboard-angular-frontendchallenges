import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeModeSliderComponent } from './theme-mode-slider.component';

describe('ThemeModeSliderComponent', () => {
  let component: ThemeModeSliderComponent;
  let fixture: ComponentFixture<ThemeModeSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThemeModeSliderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeModeSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
