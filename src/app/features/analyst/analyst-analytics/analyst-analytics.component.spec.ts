import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystAnalyticsComponent } from './analyst-analytics.component';

describe('AnalystAnalyticsComponent', () => {
  let component: AnalystAnalyticsComponent;
  let fixture: ComponentFixture<AnalystAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalystAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalystAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
