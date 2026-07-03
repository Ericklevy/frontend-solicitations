import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalystOverviewComponent } from './analyst-overview.component';

describe('AnalystOverviewComponent', () => {
  let component: AnalystOverviewComponent;
  let fixture: ComponentFixture<AnalystOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalystOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalystOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
