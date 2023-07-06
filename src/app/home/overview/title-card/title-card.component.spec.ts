import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleCardComponent } from './title-card.component';

describe('TitleCardComponent', () => {
  let component: TitleCardComponent;
  let fixture: ComponentFixture<TitleCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitleCardComponent]
    });
    fixture = TestBed.createComponent(TitleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
